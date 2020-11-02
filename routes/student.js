
const path = require("path");
const router = require("express").Router();
const batchdetails = require('../models/BatchDetails.js')
const studentdetails = require('../models/Students.js')
const classdetails = require('../models/Classdetails.js');
const teacherdetails = require('../models/TeacherDetails.js');;


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

  // Add Student Record  without batch linking -- implemented
router.post("/api/teacher/student/new", isLoggedIn, (req, res) => {
    let insertedstudent = {};
    studentdetails
      .create(req.body.newrecord)
      .then(function (dbstudentdetails) {
        insertedstudent = {
          stdid: dbstudentdetails._id,
          studentfname: dbstudentdetails.studentfname,
          studentlname: dbstudentdetails.studentlname,
          loginemail: dbstudentdetails.loginemail,
          phonenumber: dbstudentdetails.parentphonenumber,
          parentname: dbstudentdetails.parentname
        };
        console.log("Inserted student record", insertedstudent);
        res.json(insertedstudent);
      }).catch(function (err) {
        console.log("error in student batch", err)
        if (err.errmsg) {
          if ((err.errmsg).substr(0, 6) === 'E11000') {
            console.log("Student Login - already exist");
            res.json({ error: "Student email already exist :" });
          }
          else {
            console.log("Error in Creating Student details", err)
            res.json(err);
          }
        }
        else {
          console.log("Exceptional Error: ", err)
          res.json(err);
        }
      }); // end db studentdetails
  }); // End router to Student in StudentManagement -- implemented


  // Get All Student Details -- implemented
router.get("/api/teacher/students/all", isLoggedIn, (req, res) => {
    //console.log("Check Session - teacher login",req.session.passport.user.user.userdata._id);
    studentdetails.find({})
      .populate({
        path: 'batchid',
        select: '_id batchdesc subject'
      })
      .then((data) => {
        console.log("student details", data);
        res.json(data);
      })
      .catch((err) => {
        console.log("Error in fetching all Student details", err);
        res.json(err);
      });
  }); // Get all student details --implemented

  // Update Student details from -Student Management --implemented
router.put("/api/teacher/student/update/:id", isLoggedIn, (req, res) => {
    console.log("Student record", req.body);
    studentdetails.updateOne(
      { _id: req.params.id },
      {
        $set: {
          studentfname: req.body.stdfname,
          studentlname: req.body.stdlname,
          loginemail: req.body.stdemail,
          parentname: req.body.parentname,
          parentphonenumber: req.body.phonenumber,
          levelcompleted:req.body.levelcompleted,
          levelrequested:req.body.levelrequested
        }
      }
    ).then((data) => {
      console.log("Updated Student personal details", data)
      res.json(data)
    }).catch((error) => {
      console.log("Error - student personal details update", error);
      res.json("Error in updating student personal details", error)
    }); // End studentdetails db operation
  }); // End of router update for student details --implemented

  // Route to fetch student Id and name

router.get('/api/teacher/student/iddetails/',isLoggedIn,(req,res) => {
    studentdetails.find({},
    {_id:1,studentfname:1,studentlname:1,loginemail:1})
    .then((results) => {
      console.log("REcords fetched",results);
      res.json(results)
    })
    .catch((error) => {
      console.log("Error in fetching student ID",error);
      res.json({"err":error});
    })
  });
  