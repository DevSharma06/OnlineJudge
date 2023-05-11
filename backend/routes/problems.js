const express = require("express");
const router = express.Router();

const { getProblems, getProblem } = require("../controllers/problemController");

router.get("/getProblems/", getProblems);

router.get("/getProblem/:id", getProblem);

module.exports = router;
