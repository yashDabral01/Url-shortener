const express = require("express");
const {handleUserSignup, handleUserLogin} = require("../controllers/user")
const router = express.Router();

router.post("/",handleUserSignup);   // i have change this to  /signup to / this
router.post("/login",handleUserLogin);
module.exports = router;