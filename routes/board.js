const path = require("path");
const router = require("express").Router();
const teacherdetails = require('../models/TeacherDetails.js');


const isLoggedIn = (req, res, next) => {
    console.log("Routes - req isloggedin", req.user)
    if (!req.user) {
      // USer is not logged in
      console.log("Routes isLoggedIn- No user data found", req.user)
      res.redirect("/login");
    }
    else {
      console.log("Routes-IsloggedIn-USer logged in", req.user);
      next();
    }
  }


  //board teacher
router.post('/api/board/new', (req, res) => {
    console.log("Teacher account creation -", req.body);
    teacherdetails.create(req.body)
      .then((response) => {
        console.log("Teacher details created", response);
        res.json(response);
      })
      .catch((error) => {
        if (error == 'E11000') {
          console.log("Teacher Detials already exist", error);
          res.send({ "err": "Teacher Account already exist for this Email ID", "errcode": (error.errmsg) });
        }
        else {
          console.log("Unable to create teacher account", error)
          res.send({ "err": "Unable to create Teacher Account ", "errcode": error.errmsg });
        }
      })
  });