const mongoose = require("mongoose");
const Problem = require("../model/problemModel");

const { generateFile } = require("../utility/generateFile");
const { executeJava } = require("../utility/executeJava");

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
  try {
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

    try {
      const problem = Problem.create({
        title,
        description,
        languages,
        difficulty,
        test_cases,
      });

      return res.status(200).json({
        problemDetails: problem,
        status: "Data inserted successfully",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const submitProblem = async (req, res) => {
  try {
    const { language, code } = req.body;

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
      const filepath = await generateFile(language, code);

      const output = await executeJava(filepath);

      return res.status(200).json({ filepath, output });
    } catch (err) {
      return res.status(500).json({ err });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  getProblemByNo,
  submitProblem,
  addProblem,
};
