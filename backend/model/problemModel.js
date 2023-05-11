const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testCasesSchema = new Schema({
  input: [String],
  output: [String],
});

const problemSchema = new Schema({
  serial_no: Number,
  title: String,
  description: [String],
  languages: [String],
  difficulty: String,
  test_cases: testCasesSchema,
});

module.exports = mongoose.model("Problem", problemSchema);
