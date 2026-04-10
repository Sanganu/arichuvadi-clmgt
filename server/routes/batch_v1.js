import {Router} from "express";
const router = Router()
import Batchdetails from "../models/BatchDetails.js";

const isLoggedIn = (req, res, next) => {
  const sessionUser = req.session?.user;
  const passportUser = req.user;
  const user = sessionUser || passportUser;
  const role = sessionUser?.role || passportUser?.usertype;

  console.log("Routes - req isloggedin", user);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (role !== "board" && role !== "management") {
    console.log("Only board member can edit");
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}


  //Create new batch -- implemented
router.post('/api/board/batch/new', isLoggedIn, function (req, res) {
    const { batchdesc, course, level, teacher, examDate, teacherModel } = req.body;

    if (!teacher) {
      return res.status(400).json({
        error: 'Instructor is required. Select an instructor or add board/instructor accounts first.'
      });
    }

    const newrecord = {
      batchdesc,
      course,
      level,
      teacher,
      teacherModel: teacherModel === 'Instructor' ? 'Instructor' : 'Boarddetails',
      ...(examDate ? { examDate: new Date(examDate) } : {})
    };

    Batchdetails
      .create(newrecord)
      .then(async function (dbdetails) {
        const populateBatchTeacherModel = await Batchdetails.findById(dbdetails._id).populate({path'teacher',model:newrecord.teacherModel});
        console.log("Inserted record details", populateBatchTeacherModel);
        res.json(po);
      })
      .catch(function (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
          return res.status(400).json({ error: err.message, details: err.errors });
        }
        res.status(500).json({ error: err.message || 'Unable to create batch' });
      });
  }); // end batchdetails -- create batch implemented

  // Get All batch details -- implemented
router.get("/api/board/batch/all", isLoggedIn, (req, res) => {
  console.log("<<<<Check Session - teacher login", req.session.user);//undefined
    // console.log("=================<<<<<<<<<===============");
    Batchdetails.find({})
      .then((data) => {
       console.log("Batch details - ALL BATCHES", data);
        res.json(data);
      })
      .catch((err) => {
        console.log("Error in fetching all batch details", err);
        res.json(err);
      });
  }); // Get all batch details -- implemented




  // Update Batch --implemented
router.put("/api/board/batch/update", isLoggedIn, (req, res) => {
    // console.log("The batch id: ",req.body);
    Batchdetails.updateOne(
      { _id: req.body.batchid },
      {
        $set: {
          batchdesc: req.body.batchdesc,
          course: req.body.course,
          level: req.body.level,
          teacher: req.body.teacher,
          examDate:req.body.examDate
        }
      }
    ).then((data) => {
      console.log("Updated Batch detils", data)
      res.json(data)
    }).catch((error) => {
      console.log("Error", error);
      res.json("Error in updating batch details", error)
    });
  }); 

//trying this ----Delete student details from a batch-- v1 v2 -- working??
router.put('/api/board/batch/student/delete/',isLoggedIn, (req, res) => {
    // console.log("Student delete from batch-inputs",req.user, req.body.batchid, req.body.studentid);
    Batchdetails.updateOne({ _id: req.body.batchid },
      { $pull: { students: req.body.studentid } })
      .then((data) => {
        console.log("Student details delete from batch", data);
        batchdetails.findOne({ _id: req.body.batchid }, function (error, record) {
          if (error) res.json(error);
          console.log("Record after removing student", record);
          res.json(record);
        });
  
      })
      .catch((err) => {
        console.log("Error in deleting class details", err);
        res.json(err); student
      });
  }); // end of router to delete studentfrom batch

//Delete Student from a batch -- V3 -- working??
router.put('/api/batch/student/del/',isLoggedIn, (req, res) => {
  var stdid = req.body.studentid
  console.log("Student delete from batch-inputs", stdid);
  Batchdetails.findOne({ "_id": req.body.batchid },
    function (error, record) {
      if (error) {
        console.log("Error in deleting student details", err);
        res.json(err);
      } else if (record) {
        var indexofitem = record.students ? record.students.indexOf(stdid) : -1;
        console.log("Before Index", record, record.students)
        if (indexofitem !== -1) {
          record.students.splice(indexofitem, 1);
          console.log("New Array", record.students)
          record.save(function (error) {
            if (error) console.log("Error in remove -student from batch", error);
            else {
              console.log("Student Removed from batch", record);
              res.json(record)
            };
          }); // end save
        } // end if of index
      }// end if of find record
    }); // end of callback for find record
}); // end of router delete student from batch




//Delete student details from a batch-- v1 v2 -- working??
router.put('/api/batch/student/delete/', isLoggedIn, (req, res) => {
  // console.log("Student delete from batch-inputs", req.user,req.body.batchid, req.body.studentid);
  Batchdetails.updateOne({ _id: req.body.batchid },
    { $pull: { students: req.body.studentid } },{new:true})
    .then((data) => {
      console.log("Student details delete from batch", data);
      batchdetails.findOne({ _id: req.body.batchid }, function (error, record) {
        if (error) res.json(error);
        console.log("Record after removing student", record);
        res.json(record);
      });

    })
    .catch((err) => {
      console.log("Error in deleting class details", err);
      res.json(err); student
    });
}); // end of router to delete studentfrom batch



export default router;
