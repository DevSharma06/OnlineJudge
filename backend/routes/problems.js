const express = require("express");
const router = express.Router();

const {
  getProblems,
  getProblemById,
  getProblemByNo,
  submitProblem,
  addProblem,
} = require("../controllers/problemController");

router.get("/getProblems/", getProblems);

router.get("/getProblemById/:id", getProblemById);

router.get("/getProblemByNo/:no", getProblemByNo);

router.post("/submitProblem/", submitProblem);

router.post("/addProblem/", addProblem);

module.exports = router;
