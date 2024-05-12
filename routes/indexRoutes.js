const express = require("express");
const router = express.Router();
const { homepage, currentUser, studentsignup, studentsignin, studentsignout, studentsendmail, studentforgetlink, studentresetpassword} = require("../controllers/indexController");
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

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET /student/forget-link/:studenttid
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studenttid
router.post("/student/reset-password/:id",isAuthenticated, studentresetpassword);

module.exports = router;

