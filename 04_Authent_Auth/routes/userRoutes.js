const express = require("express");
const router = express.Router();
const { signUpController, login } = require("../controllers/userController");
const{auth, isStudent, isAdmin} = require('../middlerwares/Auth')

router.post("/signup", signUpController);
router.post("/login", login);

//protected Routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route For Students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route for Admin",
  });
});

module.exports = router;
