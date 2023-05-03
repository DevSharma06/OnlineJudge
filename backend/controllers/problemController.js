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

module.exports = {
  getProblems,
};
