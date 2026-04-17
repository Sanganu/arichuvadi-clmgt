import { Router } from "express";
const router = Router()
import Students from "../models/Students.js";


const isLoggedIn = (req, res, next) => {
  const sessionUser = req.session?.user;
  const passportUser = req.user;
  const user = sessionUser || passportUser;
  const role = sessionUser?.role || passportUser?.usertype;

  console.log("Routes - req isloggedin", user);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (role !== "student") {
    console.log("Login is not a student");
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

// Add Student Record  without batch linking -- implemented
router.post("/api/student/new", (req, res) => {
  let insertedstudent = {};
  console.log("______________________ CREATE___________________",req.body)
  Students
    .create(req.body)
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
      res.status(200).json(insertedstudent);
    }).catch(function (err) {
      console.log("error in student batch", err)
      if (err.errmsg) {
        if ((err.errmsg).substr(0, 6) === 'E11000') {
          console.log("Student Login - already exist");
          res.status(500).json({ error: "Student email already exist :" });
        }
        else {
          console.log("Error in Creating Student details", err)
          res.status(500).json(err);
        }
      }
      else {
        console.log("Exceptional Error: ", err)
        res.status(500).json(err);
      }
    }); // end db studentdetails
}); // End router to Student in StudentManagement -- implemented


// Get All Student Details -- implemented
router.get("/api/students/all", isLoggedIn, (req, res) => {
  console.log("Check Session - teacher login", req.session.passport.user.user.userdata._id);
  Students
    .find()
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
router.put("/api/student/update/:id", isLoggedIn, (req, res) => {
  console.log("Student record", req.body);
  Students.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        studentfname: req.body.stdfname,
        studentlname: req.body.stdlname,
        loginemail: req.body.stdemail,
        parentname: req.body.parentname,
        parentphonenumber: req.body.phonenumber,
        levelcompleted: req.body.levelcompleted,
        levelrequested: req.body.levelrequested
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
router.get('/api/student/iddetails/', isLoggedIn, (req, res) => {
  Students.aggregate([
    { $project: { Fullname: { $concat: ["$studentfname", " ", "$studentlname"] } } }
  ]).then((results) => {
    console.log("REcords fetched", results);
    res.json(results)
  }).catch((error) => {
      console.log("Error in fetching student ID", error);
      res.json({ "err": error });
  });
});

// Update Student - to add batch enrolled (Not yet implemented)
router.put("/api/studentbatch/update", (req, res) => {
  console.log("Student details", req.body);
  Students.updateOne(
    { _id: req.body.studentid },

  ).then((data) => {
    console.log("Updated ", data)
    res.json(data)
  }).catch((error) => {
    console.log("Error", error);
    res.json("Error in updating", error)
  }); // End studentdetails
}); // End router u


//Student Registration
// router.post("/api/student/new", (req, res) => {
//   let insertedstudent = {};
//   console.log(req.body)
//   studentdetails
//     .create(req.body)
//     .then(function (dbstudentdetails) {
//       console.log("route",dbstudentdetails)
//       insertedstudent = {
//         stdid: dbstudentdetails._id,
//         studentfname: dbstudentdetails.studentfname,
//         studentlname: dbstudentdetails.studentlname,
//         loginemail: dbstudentdetails.loginemail,
//         phonenumber: dbstudentdetails.parentphonenumber,
//         parentname: dbstudentdetails.parentname
//       };
//       console.log("Inserted student record", insertedstudent);
//       res.json(insertedstudent);
//     }).catch(function (err) {
//       console.log("error in student batch", err)
//       if (err.errmsg) {
//         if ((err.errmsg).substr(0, 6) === 'E11000') {
//           console.log("Student Login - already exist");
//           res.json({ error: "Student email already exist :" });
//         }
//         else {
//           console.log("Error in Creating Student details", err)
//           res.json(err);
//         }
//       }
//       else {
//         console.log("Exceptional Error: ", err)
//         res.json(err);
//       }
//     }); // end db studentdetails
// }); // End router to Student in StudentManagement -- implemented



// Delete Student Details completely - Student Management --???
router.delete('/api/student/delete/:id', isLoggedIn, (req, res) => {
  Students.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log("The deletion data", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Delete Student details completely", error);
      res.json(error);
    }); // End to delete studentdetails
}); // End of router delete student details




// Get All Student Details -- implemented
router.get("/api/students/batch/all", isLoggedIn, (req, res) => {
  //console.log("Check Session - teacher login",req.session.passport.user.user.userdata._id);
  Students.find({})
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

export default router;

