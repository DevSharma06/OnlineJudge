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
const requireModRole = require("../middleware/requireModRole");

// require auth for all problem routes
router.use(requireAuth);

router.get("/getProblems/", getProblems);

router.get("/getProblemById/:id", getProblemById);

router.get("/getProblemByNo/:no", getProblemByNo);

router.post("/submitProblem/", submitProblem);

router.post("/addProblem/", requireModRole, addProblem);

router.post("/addTestCase/", requireModRole, addTestCase);

module.exports = router;
