const express = require("express");
const router = express.Router();
const { homepage, 
    currentEmploye, 
    employesignup, 
    employesignin,
    employesignout, 
    employesendmail, 
    employeforgetlink, 
    // employeresetpassword, employeupdate, employeavatar
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/", homepage);

// POST /employe
router.post("/current", isAuthenticated, currentEmploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// GET /employe/signout
router.get("/signout", isAuthenticated, employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// GET /employe/forget-link/:employeid
router.get("/forget-link/:id", employeforgetlink);

// // POST /employe/reset-password/:employeid
// router.post("/employe/reset-password/:id",isAuthenticated, employeresetpassword);

// // POST /employe/update/:employeid
// router.post("/employe/update/:id",isAuthenticated, employeupdate);

// // POST /employe/avatar/:employeid
// router.post("/employe/avatar/:id",isAuthenticated, employeavatar);


module.exports = router;

