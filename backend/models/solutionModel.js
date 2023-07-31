const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testCasesSchema = new Schema({
  input: { type: [String], unique: true, dropDups: true },
  output: { type: [String], unique: true, dropDups: true },
});

const solutionSchema = new Schema({
  problemId: mongoose.Types.ObjectId,
  test_cases: [testCasesSchema],
});

module.exports = mongoose.model("Solution", solutionSchema, "solution");
