const express = require("express");
const router = express.Router();
const { homepage, currentUser, studentsignup, studentsignin, studentsignout, } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/", homepage);

// POST /student
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

module.exports = router;

//{5th Video}