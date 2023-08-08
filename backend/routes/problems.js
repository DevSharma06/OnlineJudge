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

const requireAuth = require("../middleware/requireAuth");

// require auth for all workout routes
router.use(requireAuth);

router.get("/getProblems/", getProblems);

router.get("/getProblemById/:id", getProblemById);

router.get("/getProblemByNo/:no", getProblemByNo);

router.post("/submitProblem/", submitProblem);

router.post("/addProblem/", addProblem);

router.post("/addTestCase/", addTestCase);

module.exports = router;
