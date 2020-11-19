const path = require("path");
const router = require("express").Router();
const Batchdetails = require('../models/BatchDetails.js')
const Studentdetails = require('../models/Students.js')
const Classdetails = require('../models/Classdetails.js');
const Board = require('../models/Management.js');
const Teacher = require("./teacher.js")
//const passport = require("passport");
var YouTube = require('youtube-node');
var youTube = new YouTube();


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



//Add New student And Update Batches table -- implemented 
router.post('/api/board/batch/student/new', isLoggedIn, function (req, res) {
  //console.log("Check Session - teacher login",req.session.passport.user.user.userdata._id);    
  var newrecord = {
    studentfname: req.body.studentfname,
    studentlname: req.body.studentlname,
    parentname: req.body.parentname,
    loginemail: req.body.loginemail.toLowerCase(),
    password: req.body.password,
    batchid: req.body.batchid,
    parentphonenumber: req.body.parentphonenumber,
    levelcompleted: req.body.levelcompleted,
    levelrequested: req.body.levelrequested
  };
  var insertedstudent = {
    stdid: '',
    studentfname: '',
    studentlname: '',
    loginemail: '',
    password: '',
    phonenumber: ''
  };
  Studentdetails
    .create(newrecord)
    .then(function (dbstudentdetails) {
      insertedstudent = {
        stdid: dbstudentdetails._id,
        studentfname: dbstudentdetails.studentfname,
        studentlname: dbstudentdetails.studentlname,
        loginemail: dbstudentdetails.loginemail,
        phonenumber: dbstudentdetails.parentphonenumber
      };
      console.log("The Student Record inserted --", insertedstudent, req.body.batchid);
      return Batchdetails.findOneAndUpdate({ _id: req.body.batchid },
        { $push: { students: dbstudentdetails._id } });
    })
    .then(function (data) {
      console.log("Batch details updated with new student", data, "\n");
      res.json(insertedstudent);
    })
    .catch(function (err) {
      console.log("error in student batch", err)
      if (err.errmsg) {
        if ((err.errmsg).substr(0, 6) === 'E11000') {
          console.log("Student Login - already exist");
          res.status(404).json({ error: "Student email already exist :" });
        }
        else {
          console.log("Error in updating Batch and Student details", err)
          res.json(err);
        }
      }
      else {
        console.log("Exceptional Error: ", err)
        res.json(err);
      }
    }); // End db studentdetails batchdetails
}); // End router Student add to batch -- implemented







// Fetch student records  and class details for the specific batch -- implemented
router.get('/api/batch/student/class/details/:bid', isLoggedIn, (req, res) => {
  let batchid = req.params.bid;
  let studentrecords = [];
  console.log("The Session data ", req.session.passport.user, req.session.passport.user.user.userdata._id);

  Studentdetails.find({
    batchid: batchid
  }).then((records) => {
    console.log("Student records fetched for the batch", records);
    Classdetails.find({
      batch: batchid
    }).then((recs) => {
      console.log("Class details fetched --", recs);
      res.json({ srecords: records, crecords: recs });
    });
  }).catch((error) => {
    console.log("Unable to fetch student  and class records for the batch", error);
    res.json(error);
  }); // end Studentdetails find
});// end router to get batch students and classes -implemented






// Search Student & Batch Records -- implemented
router.get('/api/teacher/search/:str', isLoggedIn, (req, res) => {
  let student_details
  let batch_details
  let searchString = req.params.str;
  console.log("Inside route search", searchString);
  // Search for Student details
  Studentdetails
    .find({
      $or:
        [
          { studentfname: { "$regex": searchString, "$options": "i" } },
          { studentlname: { "$regex": searchString, "$options": "i" } },
          { loginemail: { "$regex": searchString, "$options": "i" } },
          { parentname: { "$regex": searchString, "$options": "i" } },
          { parentphonenumber: { "$regex": searchString, "$options": "i" } }
        ]
    })
    .then((studentdet) => {
      console.log("Search - Student done", studentdet, "Str", searchString);
      Student_details = studentdet;
      Batchdetails.find({
        $or: [
          { batchdesc: { "$regex": searchString, "$options": "i" } },
          { level: { "$regex": searchString, "$options": "i" } },
          { course: { "$regex": searchString, "$options": "i" } },
          { teacher: { "$regex": searchString, "$options": "i" } }
        ]
      })
        .then((batchdet) => {
          console.log("REcords fetched", batchdet)
          res.json({ studentdetails: studentdet || "", batchdetails: batchdet || "" })
        })
        .catch((err) => {
          console.log("No records found-1", err);
          res.json({ err })
        });
      // res.json(studentdet)
    })
    .catch((err) => {
      console.log("No records found-2", err);
      // res.json(err);
      res.json({ err })
    }); // end fetch studentdetails records
}); // End of Router -- search implemented


// ALL Instructor details - Teachers and Board
router.get('/api/instructor/all', (req, res) => {
        let list =[]
        Board.find({}, 'fname lname')
          .then((results) => {
            list = results
            console.log("Records fetched for teachers", results);
            return Teacher.find({},'fname lname')
          })
          .then(function (allinstructors) {
            console.log(allinstructors)
            let allinst = list.concat(allinstructors)
            res.json(allinst);
          })
          .catch((error) => {
                console.log("Error in fetching", erroboardr);
                res.json(error);
          });
 });

  ////Add Class details And Update Batches table - implemented
  router.post('/api/instructor/batch/class/add', isLoggedIn, function (req, res) {
          // console.log("Insiderouter to add class details",req.body);
          var newrecord = req.body;
          Classdetails
            .create(newrecord)
          .then(function (dbclassdetails) {
              console.log("The class details entered : ", dbclassdetails)
              Batchdetails.findOneAndUdate({ _id: req.body.batch }, { $push: { classid: dbclassdetails._id } })
          })
          .then(function (data) {
                  console.log("Inserted class details and updated batchdetails with classid", data);
                  res.json(dbclassdetails);
          })
          .catch(function (err) {
              if (err) {
                console.log("The Error", err)
                res.json(err);
              }
          });
  }); // Add Class details and update batch --implemented



  //======================================================================

  //==========================================================

  //Delete Class details from a batch -- working??
  router.put('/api/batch/class/delete/', (req, res) => {
          console.log("Class delete from batch-inputs", req.body.batchid, req.body.studentid);
            Batchdetails.updateOne({ _id: req.body.batchid },
                    { $pull: { classid: req.body.classid } })
            .then((data) => {
              console.log("Classdetails delete from batch", data);
              res.json(req.body.studentid);
            })
            .catch((err) => {
              console.log("Error in deleting class details", err);
              res.json(err);
            });
  }); // end of router to delete class from batch


 


  module.exports = router;
