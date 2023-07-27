const mongoose = require("mongoose");
const Problem = require("../model/problemModel");
const Solution = require("../model/solutionModel");

const { generateFile } = require("../utility/generateFile");
const { executeJava } = require("../utility/executeJava");
const { executeCpp } = require("../utility/executeCpp");

const isValidProblem = (value) => mongoose.Types.ObjectId.isValid(value);

const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();

    res.status(200).json(problems);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Problem does not exist" });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ error: "Problem does not exist" });
    }

    return res.status(200).json(problem);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getProblemByNo = async (req, res) => {
  try {
    const { no } = req.params;

    const problem = await Problem.findOne({ serial_no: no });
    if (!problem) {
      return res.status(404).json({ error: "Problem does not exist" });
    }

    return res.status(200).json(problem);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const addProblem = async (req, res) => {
  const { title, description, languages, difficulty, test_cases } = req.body;
  if (!title) {
    return res.status(404).json({ error: "Problem title cannot be empty" });
  }
  if (!description) {
    return res
      .status(404)
      .json({ error: "Problem description cannot be empty" });
  }
  if (!languages) {
    return res.status(404).json({ error: "Select at least one language" });
  }
  if (!difficulty) {
    return res.status(404).json({ error: "Select difficulty" });
  }
  if (!test_cases) {
    return res
      .status(404)
      .json({ error: "Sample input/output cannot be empty" });
  }
  if (!test_cases.input) {
    return res.status(404).json({ error: "Sample input cannot be empty" });
  }
  if (!test_cases.output) {
    return res.status(404).json({ error: "Sample output cannot be empty" });
  }

  // Adding Problem
  await Problem.create({
    title,
    description,
    languages,
    difficulty,
    test_cases,
  })
    .then(async (data) => {
      console.log(data._id);

      // Adding Test Case
      const filter = {
        problemId: data._id,
        "test_cases.input": { $ne: test_cases.input },
      };
      const options = { upsert: true };

      await Solution.updateOne(
        filter,
        {
          // $push: { test_cases: test_cases },
          $addToSet: {
            test_cases: {
              input: test_cases.input,
              output: test_cases.output,
            },
          },
        },
        options
      )
        .then((data) => {
          console.log(data);

          return res.status(200).json({
            problemDetails: data,
            status: "Data inserted successfully",
          });
        })
        .catch((err) => {
          return res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const addTestCase = async (req, res) => {
  const { problemId, input, output } = req.body;

  if (!problemId) {
    return res
      .status(400)
      .json({ success: false, error: "No problem found to add test case" });
  }
  if (!input) {
    return res
      .status(400)
      .json({ success: false, error: "Input cannot be empty" });
  }
  if (!output) {
    return res
      .status(400)
      .json({ success: false, error: "Output cannot be empty" });
  }

  if (!isValidProblem(problemId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid Problem Id or Problem not found",
    });
  }

  const filter = {
    problemId: problemId,
    "test_cases.input": { $ne: input },
  };
  const options = { upsert: true };
  await Solution.updateOne(
    filter,
    {
      // $push: { test_cases: test_cases },
      $addToSet: { test_cases: { input: input, output: output } },
    },
    options
  )
    .then((doc) => {
      return res.status(200).json({
        status: doc,
        message: "Test Case inserted successfully",
      });
    })
    .catch((err) => {
      if (err && err.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "Input already exists. Please enter unique Input",
        });
      } else {
        return res.status(500).json({ message: err.message });
      }
    });
};

const submitProblem = async (req, res) => {
  try {
    const { language, code, problemId } = req.body;

    if (!isValidProblem(problemId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Problem Id or Problem not found",
      });
    }
    if (!language) {
      return res
        .status(400)
        .json({ success: false, error: "Language cannot be empty" });
    }
    if (!code) {
      return res
        .status(400)
        .json({ success: false, error: "Code cannot be empty" });
    }

    try {
      if (language === "C++") {
        const lang = "cpp";
        const filepath = await generateFile(lang, code);

        getSolution(problemId).then((solution) => {
          const testCases = solution.test_cases;
          for (let i = 0; i < testCases.length; i++) {
            const output = executeCpp(filepath, testCases[i]);
            if (testCases[i].output != output) {
              return res.status(200).json({
                status: "200",
                message: `Test Case ${i + 1} failed`,
              });
            }
          }

          return res.status(200).json({
            status: "200",
            message: "All test cases passed successfully",
          });
        });

        return res.status(200).json({ filepath, output });
      } else if (language === "Java") {
        const lang = "java";
        const filepath = await generateFile(lang, code);

        getSolution(problemId).then((solution) => {
          const testCases = solution.test_cases;
          for (let i = 0; i < testCases.length; i++) {
            const output = executeJava(filepath, testCases[i]);

            if (testCases[i].output.trim() != output.trim()) {
              return res.status(200).json({
                status: "400",
                message: `Test Case ${i + 1} failed. Please try again!`,
              });
            }
          }

          return res.status(200).json({
            status: "200",
            message: "All test cases passed successfully",
          });
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getSolution = async (problemId) => {
  const solution = await Solution.findOne({ problemId: problemId });
  return solution;
};

module.exports = {
  getProblems,
  getProblemById,
  getProblemByNo,
  submitProblem,
  addProblem,
  addTestCase,
};
