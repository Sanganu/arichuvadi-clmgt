const express = require('express')
const router = express.Router();
const Teachers = require("../models/Teachers");
const passport = require('../passport')



router.get("/teacher/login",(req,res) =>{
    res.json({"msg":"send to google"});
    // to render the login page
});

//Make the google account screen display
router.get("/teacher/google",(req,res) => {
    //handle with passort
      res.send("Make google sign in screen appear")
});

//The callback 
router.get("/auth/google/teacher",passport.authenticate("google"),(req,res) => {
    console.log("The router callback");
});

router.get("/teacher/logout",(req,res)=>{
    res.send("logout with google");
});

module.exports = router;
