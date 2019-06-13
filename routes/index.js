const path = require("path");
const router = require("express").Router();
const batchdetails = require('../models/BatchDetails.js')
const studentdetails = require('../models/Students.js')
const classdetails = require('../models/Classdetails.js');
const teacherdetails = require('../models/Teachers.js');
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
//Create new batch -- implemented
router.post('/api/teacher/batch/new', isLoggedIn, function (req, res) {
  var newrecord = req.body;
  //  console.log("Insiderouter to add new batch",req.body);
  console.log("Check Session - teacher login", req.session.passport.user.user.userdata._id);
  batchdetails
    .create(newrecord)
    .then(function (dbdetails) {
      console.log("Inserted record details", dbdetails);
      res.json(dbdetails);
    })
    .catch(function (err) {
      if (err) {
        var vrmsg = (err.errmsg).substr(0, 6);
        if (vrmsg === 'E11000') {
          console.log("Batch ID already exist -- Please use different ID to create a new batch");
          res.json({
            errid: vrmsg,
            errstring: "Batch details already exist -- Please delete old batch and register again if this is a new batch",
            err: err
          });
        }
        else {
          console.log("Error on saving batch details", err);
          res.json({
            errid: 'OTHERS',
            errstring: "OTHERS -Error in saving Batch details",
            err: err
          });
        }

      }
    }); //end catch section
}); // end batchdetails -- create batch implemented


//Add New student And Update Batches table -- implemented 
router.post('/api/teacher/batch/student/new', isLoggedIn, function (req, res) {
  //console.log("Check Session - teacher login",req.session.passport.user.user.userdata._id);    
  var newrecord = {
    studentfname: req.body.studentfname,
    studentlname: req.body.studentlname,
    parentname: req.body.parentname,
    loginemail: req.body.loginemail.toLowerCase(),
    password: req.body.password,
    batchid: req.body.batchid,
    parentphonenumber: req.body.parentphonenumber
  };
  var insertedstudent = {
    stdid: '',
    studentfname: '',
    studentlname: '',
    loginemail: '',
    password: '',
    phonenumber: ''
  };
  studentdetails
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
      return batchdetails.findOneAndUpdate({ _id: req.body.batchid },
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



// Get All batch details -- implemented
router.get("/api/teacher/batch/all", isLoggedIn, (req, res) => {
  console.log("<<<<Check Session - teacher login", req.session.passport);//undefined
  console.log("=================<<<<<<<<<===============");
  batchdetails.find({})
    // .populate({
    //   path:'teacher',
    //   select:'fname lname'}) /* Should be removed when click on batch to details of batch */
    .then((data) => {
      console.log("Batch details", data);
      res.json(data);
    })
    .catch((err) => {
      console.log("Error in fetching all batch details", err);
      res.json(err);
    });
}); // Get all batch details -- implemented

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

// Fetch student records  and class details for the specific batch -- implemented
router.get('/api/teacher/batch/student/class/details/:bid', isLoggedIn, (req, res) => {
  let batchid = req.params.bid;
  let studentrecords = [];
  console.log("The Session data ", req.session.passport.user, req.session.passport.user.user.userdata._id);

  studentdetails.find({
    batchid: batchid
  }).then((records) => {
    console.log("Student records fetched for the batch", records);
    classdetails.find({
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




// Update Batch --implemented
router.put("/api/teacher/batch/update", isLoggedIn, (req, res) => {
  console.log("The batch id: ", req.body.batchid, req.session.passport.user.user.userdata._id);
  batchdetails.updateOne(
    { _id: req.body.batchid },
    {
      $set: {
        batchdesc: req.body.batchdesc,
        subject: req.body.subject,
        level: req.body.level,
        teacher: req.body.teacher
      }
    }
  ).then((data) => {
    console.log("Updated Batch detils", data)
    res.json(data)
  }).catch((error) => {
    console.log("Error", error);
    res.json("Error in updating batch details", error)
  });
}); // Batch update --implemented

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


// Search Student & Batch Records -- implemented
router.get('/api/teacher/search/:str', isLoggedIn, (req, res) => {
  let student_details
  let batch_details
  let searchString = req.params.str;
  console.log("Inside route search", searchString);
  // Search for Student details
  studentdetails
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
      student_details = studentdet;
      batchdetails.find({
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
        parentphonenumber: req.body.phonenumber
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

////Add Class details And Update Batches table - implemented
router.post('/api/teacher/batch/class/add', isLoggedIn, function (req, res) {
  // console.log("Insiderouter to add class details",req.body);
  var newrecord = req.body;
  classdetails
    .create(newrecord)
    .then(function (dbclassdetails) {
      console.log("The class details entered : ", dbclassdetails)
      batchdetails.findOneAndUpdate({ _id: req.body.batch }, { $push: { classid: dbclassdetails._id } })
        .then(function (data) {
          console.log("Inserted class details and updated batchdetails with classid", data);
          res.json(dbclassdetails);
        })
      // return(dbclassdetails);
    })
    .catch(function (err) {
      if (err) {
        console.log("The Error", err)
        res.json(err);
      }
    });
}); // Add Class details and update batch --implemented






//Delete Batch -- implemented
router.delete("/api/teacher/batch/delete/:batchid",isLoggedIn, (req, res) => {
                console.log("Inside delete route for batch to student to class",req.params.batchid);
                const result =  batchdetails.deleteOne({ _id: req.params.batchid }).exec();
                if (result.n === 0) {
                  console.log("Error", error);
                  res.status(404).error({ "Error": "Error in deleting batch and class" + errror })
                }
                else {
                  console.log("The result-n", result);
                  const respdelclass =  classdetails.deleteMany({ batch: req.body.batchid }).exec();
                  if (respdelclass.n === 0) {
                    console.log("Error", error);
                    res.status(404).error({ "Error": "Error in deleting class" + errror })
                  }
                  else {
                    res.status(200).json({ "Deleted": "Batch and class details" });
                  }
               }
});

//======================================================================

// Update Student - to add batch enrolled (Not yet implemented)
router.put("/api/teacher/studentbatch/update", (req, res) => {
  console.log("Student details", req.body);
  studentdetails.updateOne(
    { _id: req.body.studentid },

  ).then((data) => {
    console.log("Updated ", data)
    res.json(data)
  }).catch((error) => {
    console.log("Error", error);
    res.json("Error in updating", error)
  }); // End studentdetails
}); // End router u


// Delete Student Details completely - Student Management --???
router.delete('/api/teacher/student/delete/:id', (req, res) => {
  studentdetails.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log("The deletion data", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Delete Student details completely", error);
      res.json(error);
    }); // End to delete studentdetails
}); // End of router delete student details

//Delete Student from a batch -- V3 -- working??
router.put('/api/batch/student/del/', (req, res) => {
  var stdid = req.body.studentid
  console.log("Student delete from batch-inputs", stdid);
  batchdetails.findOne({ "_id": req.body.batchid },
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

//add teacher
router.post('/api/teacher/new', (req, res) => {
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
        res.send({ "err": "Unable to create Teacher Account ", "errcode": (error.errmsg).substr(0, 6) });
      }
    })
});

//Router to get all teacher details

router.get('/api/teacher/all',(req,res)=>{
  teacherdetails.find({})
  .then((results) => {
     console.log("Records fetched for teachers",results);
     res.json(results);
  })
  .catch((error) => {
    console.log("Error in fetching",error);
    res.json(error);
  });
});

//Delete student details from a batch-- v1 v2 -- working??
router.put('/api/batch/student/delete/', (req, res) => {
  console.log("Student delete from batch-inputs", req.body.batchid, req.body.studentid);
  batchdetails.updateOne({ _id: req.body.batchid },
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

//Delete Class details from a batch -- working??
router.put('/api/batch/class/delete/', (req, res) => {
  console.log("Class delete from batch-inputs", req.body.batchid, req.body.studentid);
  batchdetails.updateOne({ _id: req.body.batchid },
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


//Reference Videos Login - API to get Channel Videos and serve front end????????
router.get("/api/visitors/:str", (req, res) => {
  //console.log("Youtubheroku e API - Search");
  let videos = [];
  youTube.setKey(process.env.API_YOUTUBE);
  youTube.addParam('safeSearch', 'strict');
  youTube.search(req.params.str, 10, function (error, result) {
    if (error) {
      console.log("error in fetching youtube search data", error);
      res.json(error);
    }

    var channellist = result;
    for (let i = 0; i < channellist.items.length; i++) {
      if (channellist.items[i] && channellist.items[i].id.videoId !== undefined) {
        videos.push({
          id: channellist.items[i].id.videoId,
          title: channellist.items[i].snippet.title,
          description: channellist.items[i].snippet.description,
          url: "https://youtu.be/" + channellist.items[i].id.videoId
          // thumbnail:channellist[i].snippet.thumbnails.default
        });
      } // end if
    } // end for

    console.log("===================LIST =======================");
    console.log("Videos :-->", videos);
    console.log("===================END=========================")
    //res.json({"msg":"What is happening"});
    res.json({ "videos": videos });
  }); // End of youtube api

}); // end of visitors






module.exports = router;
