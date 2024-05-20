const express = require("express");
const router = express.Router();
const { resume } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/", isAuthenticated, resume);


module.exports = router;

