const express = require("express");
const router = express.Router();

const {
  getProblems,
  getProblemById,
  getProblemByNo,
  submitProblem,
  addProblem,
  addTestCase,
} = require("../controllers/problemController");

router.get("/getProblems/", getProblems);

router.get("/getProblemById/:id", getProblemById);

router.get("/getProblemByNo/:no", getProblemByNo);

router.post("/submitProblem/", submitProblem);

router.post("/addProblem/", addProblem);

router.post("/addTestCase/", addTestCase);

module.exports = router;
