const URL = require("../models/url");
const express = require("express");
const router = express.Router();

router.get("/",async (req,res)=>{
    const allurls = await URL.find({});
    return res.render("home");
});
router.get("/signup",async (req,res)=>{
 return res.render("signup");
});
router.get("/login",async (req,res)=>{
    return res.render("login");
   });
module.exports = router;