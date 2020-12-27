
const router = require("express").Router();
const Batchdetails = require('../models/BatchDetails.js')
const Studentdetails = require('../models/Students.js')
const Classdetails = require('../models/Classdetails.js');
const Board = require('../models/Management.js');
// const Teacher = require("./teacher.js")
//const passport = require("passport");


const isLoggedIn = (req, res, next) => {
  console.log("Routes - req isloggedin", req.user)
  if (!req.user) {
    // USer is not logged in
    console.log("Routes isLoggedIn- No user data found", req.user)
    res.redirect("/");
  }
  else {
    if (req.user.usertype !=="management"){
    console.log("Routes-IsloggedIn-USer logged in", req.user);
    next();
    }else {
      console.log("Not management")
      res.redirect("/")
    }
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



// Get Specific Batch Info
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
router.get('/api/board/search/:str', isLoggedIn, (req, res) => {
  let student_details = []
  let batch_details= []
  let management_details =[]
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
              student_details = studentdet||[]
              Batchdetails.find({
                $or: [
                  { batchdesc: { "$regex": searchString, "$options": "i" } },
                  { level: { "$regex": searchString, "$options": "i" } },
                  { course: { "$regex": searchString, "$options": "i" } }
                
                ]
              }).then((batchdet) => {
                      console.log("Records fetched batch", batchdet)
                      batch_details = batchdet||[]
                      Board.find({
                        $or: [
                          { fname: { "$regex": searchString, "$options": "i" } },
                          { lname :{ "$regex": searchString, "$options": "i" } },
                          { description: { "$regex": searchString, "$options": "i" } },
                          { loginemail: { "$regex": searchString, "$options": "i" } },
                          { designation: { "$regex": searchString, "$options": "i" } },
                          { phone: { "$regex": searchString, "$options": "i" } },
                          { skypeId: { "$regex": searchString, "$options": "i" } }
                        ]
                      }).select('fname lname description designation loginemail phone')
                      .then((boarddet) => {
                          console.log("REcords fetched", boarddet)
                          management_details = boarddet ||[]
                          res.json(
                            { studentdetails: studentdet || "",
                            batchdetails: batchdet || "",
                            managementdetails : management_details })
                      })
                      .catch(boarderror =>{
                        console.log("Board Error",boarderror)
                        res.json(boarderror)
                      });
            })  
             .catch((err) => {
                  console.log("Batch error", err);
                  res.error( err)
            });
      }).catch(studenterror => {
        console.log("Student Error",studenterror)
        res.json(studenterror)
      })  ;
    
}); // End of Router -- search implemented



  ////Add Class details And Update Batches table - implemented
  router.post('/api/instructor/batch/class/add', isLoggedIn, function (req, res) {
          console.log("Insiderouter to add class details",req.body);
          var newrecord = req.body;
          let classrecord =""
          Classdetails
            .create(newrecord)
          .then(function (dbclassdetails) {
              classrecord = dbclassdetails
              console.log("The class details entered : ", dbclassdetails,req.body)
             return Batchdetails.findOneAndUpdate(
                {_id: req.body.batch},
                {$push: { classid: dbclassdetails._id }},
                {new:true})
               
          })
          .then((data)=> {
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
  router.put("/api/board/batch/student/", function(req,res){
    console.log("batcd- student ID add",req.body)
    Batchdetails.findOneAndUpdate({ _id: req.body.batchid },
      { $push: { students: req.body.studentid } },{new:true})
    .then(function(records){
      console.log(req.body.studentid)
      return Studentdetails.findOneAndUpdate({_id:req.body.studentid},
       {batchid:req.body.batchid})
      }).then((studrecs => {
        console.log("BATCH INFO Update Student",studrecs)
        res.json(studrecs)
      }))
     .catch(function(error){
      console.log("Error in getting batch details with student and class",error)
    })
  })

  // Batch Info - Get student and class for the specific batch --implemented

  router.get("/api/board/batch/detail/:bid", function(req,res){
    console.log("batc",req.params.bid)
  let batchdetails =[]
    Batchdetails.findById(req.params.bid)
     .populate(
      {path:"students",
      select:'studentfname studentlname teacherComments'})
    .populate({
      path:"classid",
      select:'lessoncovered homework classdate'})
    .then(function(records){
      batchdetails.push(records)
        Board.findById(records.teacher).select('fname lname').then(function(instructor){
          batchdetails.push(instructor)
          console.log("BATCH INFO",instructor)
          res.json(batchdetails)
        })
     
    })
    .catch(function(error){
      console.log("Error in getting batch details with student and class",error)
    })
  })


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


 //Delete Batch -- implemented
router.delete("/api/board/batch/delete/:batchid",isLoggedIn, (req, res) => {
  console.log("Inside delete route for delete batch",req.params.batchid);
  const result =  Batchdetails.deleteOne({ _id: req.params.batchid }).exec();
  if (result.n === 0) {
    console.log("Error", error);
    res.status(404).error({ "Error": "Error in deleting batch and class" + errror })
  }
  else {
    console.log("The result-n", result);
    const respdelclass =  Classdetails.deleteMany({ batch: req.body.batchid }).exec();
    if (respdelclass.n === 0) {
      console.log("Error", error);
      res.status(404).error({ "Error": "Error in deleting class" + errror })
    }
    else {
      res.status(200).json({ "Deleted": "Batch and class details" });
    }
 }
});


  module.exports = router;
