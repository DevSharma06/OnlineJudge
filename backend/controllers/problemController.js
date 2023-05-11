const mongoose = require("mongoose");
const Problem = require("../model/problemModel");

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

module.exports = {
  getProblems,
  getProblemById,
  getProblemByNo
};
