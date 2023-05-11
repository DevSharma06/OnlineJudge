const express = require("express");
const router = express.Router();

const {
  getProblems,
  getProblemById,
  getProblemByNo,
} = require("../controllers/problemController");

router.get("/getProblems/", getProblems);

router.get("/getProblemById/:id", getProblemById);

router.get("/getProblemByNo/:no", getProblemByNo);

module.exports = router;
