import { Router } from "express";
const router = Router();
import Batchdetails from "../models/BatchDetails.js";
import Studentdetails from "../models/Students.js";
import Classdetails from "../models/Classdetails.js";
import Board from "../models/Management.js";


// const Teacher = require("./teacher.js")
//const passport = require("passport");


const isLoggedIn = (req, res, next) => {
  const sessionUser = req.session?.user;
  const passportUser = req.user;
  const user = sessionUser || passportUser;

  console.log("Routes - req isloggedin", user);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  next();
}



//Add New student And Update Batches table -- implemented 
router.post('/api/board/batch/student/new', isLoggedIn, function (req, res) {
  console.log("Check Session - teacher login", req.body, "___________________");
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



// Get Specific Batch Info
// Fetch student records  and class details for the specific batch -- implemented
router.get('/api/batch/student/class/details/:bid', isLoggedIn, (req, res) => {
  let batchid = req.params.bid;
  let studentrecords = [];
  console.log("The Session data ", req.session.user);

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
router.get('/api/board/search/:str', isLoggedIn, (req, res) => {
  let student_details = []
  let batch_details = []
  let management_details = []
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
          { parentphonenumber: { "$regex": searchString, "$options": "i" } },
          { levelcompleted: { "$regex": searchString, "$options": "i" } },
          { levelrequested: { "$regex": searchString, "$options": "i" } },
          { teacherComments: { "$regex": searchString, "$options": "i" } }
          // { cretedDate: { "$regex": searchString, "$options": "i" } }
        ]
    })
    .then((studentdet) => {
      console.log("Search - Student done", studentdet, "Str", searchString);
      student_details = studentdet || []
      Batchdetails.find({
        $or: [
          { batchdesc: { "$regex": searchString, "$options": "i" } },
          { level: { "$regex": searchString, "$options": "i" } },
          { course: { "$regex": searchString, "$options": "i" } }

        ]
      }).then((batchdet) => {
        console.log("Records fetched batch", batchdet)
        batch_details = batchdet || []
        Board.find({
          $or: [
            { fname: { "$regex": searchString, "$options": "i" } },
            { lname: { "$regex": searchString, "$options": "i" } },
            { description: { "$regex": searchString, "$options": "i" } },
            { loginemail: { "$regex": searchString, "$options": "i" } },
            { designation: { "$regex": searchString, "$options": "i" } },
            { phone: { "$regex": searchString, "$options": "i" } },
            { skypeId: { "$regex": searchString, "$options": "i" } }
          ]
        }).select('fname lname description designation loginemail phone')
          .then((boarddet) => {
            console.log("REcords fetched", boarddet)
            management_details = boarddet || []
            res.json(
              {
                studentdetails: studentdet || "",
                batchdetails: batchdet || "",
                managementdetails: management_details
              })
          })
          .catch(boarderror => {
            console.log("Board Error", boarderror)
            res.json(boarderror)
          });
      })
        .catch((err) => {
          console.log("Batch error", err);
          res.status(500).json(err)
        });
    }).catch(studenterror => {
      console.log("Student Error", studenterror)
      res.json(studenterror)
    });

}); // End of Router -- search implemented



////Add Class details And Update Batches table - implemented
router.post('/api/instructor/batch/class/add', isLoggedIn, function (req, res) {
  console.log("Insiderouter to add class details", req.body);
  var newrecord = req.body;
  let classrecord = ""
  Classdetails
    .create(newrecord)
    .then(function (dbclassdetails) {
      classrecord = dbclassdetails
      console.log("The class details entered : ", dbclassdetails, req.body)
      return Batchdetails.findOneAndUpdate(
        { _id: req.body.batch },
        { $push: { classid: dbclassdetails._id } },
        { new: true })

    })
    .then((data) => {
      console.log("Inserted class details and updated batchdetails with classid", data);
      res.json(classrecord);
    })
    .catch(function (err) {
      if (err) {
        console.log("The Error", err)
        res.json(err);
      }
    });
}); // Add Class details and update batch --implemented


// Add Student Batch - From Student ID onlu
router.put("/api/board/batch/student/", isLoggedIn, function (req, res) {
  console.log("batcd- student ID add", req.body)
  Batchdetails.findOneAndUpdate({ _id: req.body.batchid },
    { $push: { students: req.body.studentid } }, { new: true })
    .then(function (records) {
      console.log(req.body.studentid)
      return Studentdetails.findOneAndUpdate({ _id: req.body.studentid },
        { batchid: req.body.batchid })
    }).then((studrecs => {
      console.log("BATCH INFO Update Student", studrecs)
      res.json(studrecs)
    }))
    .catch(function (error) {
      console.log("Error in getting batch details with student and class", error)
    })
})

// Batch Info - Get student and class for the specific batch --implemented

router.get("/api/board/batch/detail/:bid", isLoggedIn, function (req, res) {
  console.log("batch", req.params.bid)
  let batchdetails = []
  Batchdetails.findById(req.params.bid)
    .populate(
      {
        path: "students",
        select: 'studentfname studentlname teacherComments'
      })
    .populate({
      path: "classid",
      select: 'lessoncovered homework classdate'
    })
    .populate({
      path: "teacher",
      select: "fname lname"
    })
    .then(function (records) {
      console.log("BATCH info", records)
      batchdetails.push(records)
      res.json(batchdetails)
      // Board.findById(records.teacher)
      // .select('fname lname')
      // .then(function(instructor){
      //     batchdetails.push(instructor)
      //     console.log("BATCH INFO",instructor)

      // })

    })
    .catch(function (error) {
      console.log("Error in getting batch details with student and class", error)
    })
})


//======================================================================

//==========================================================

//Delete Class details from a batch -- working??
router.put('/api/batch/class/delete/', isLoggedIn, (req, res) => {
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


//Delete Batch -- implemented
router.delete("/api/board/batch/delete/:batchid", isLoggedIn, (req, res) => {
  console.log("Inside delete route for delete batch", req.params.batchid);

  const result = Batchdetails.deleteOne({ _id: req.params.batchid }).exec();
  if (result.n === 0) {
    console.log("Error", error);
    res.status(404).error({ "Error": "Error in deleting batch and class" + errror })
  }
  else {
    console.log("The result-n", result);
    const respdelclass = Classdetails.deleteMany({ batch: req.params.batchid }).exec();
    if (respdelclass.n === 0) {
      console.log("Error", error);
      res.status(404).error({ "Error": "Error in deleting class" + errror })
    }
    else {
      res.status(200).json({ "Deleted": "Batch and class details" });
    }
  }
});

export default router;
 