const path = require("path");
const router = require("express").Router();
const batchdetails = require('../models/BatchDetails.js')
const studentdetails = require('../models/Students.js')
const classdetails = require('../models/Classdetails.js')
const passport = require("passport");
const youtubechannel = require('youtube-channel-videos');

//Create new batch -- implemented
router.post('/api/teacher/batch/new',function(req,res) {
      var newrecord = req.body;
       console.log("Insiderouter to add new batch",req.body);

      batchdetails
             .create(newrecord)
             .then(function(dbdetails){
                console.log("Inserted record details",dbdetails);
                 res.json(dbdetails);
             })
             .catch(function(err){
                  if(err)
                  {
                     var vrmsg  = (err.errmsg).substr(0,6);
                        if( vrmsg === 'E11000')
                           {
                             console.log("Batch ID already exist -- Please use different ID to create a new batch");
                             res.json({
                                 errid: vrmsg,
                                 errstring: "Batch details already exist -- Please delete old batch and register again if this is a new batch",
                                 err : err
                                });
                           }
                        else
                        {
                            console.log("Error on saving batch details",err);
                            res.json({
                              errid: 'OTHERS',
                              errstring: "OTHERS -Error in saving Batch details",
                              err : err
                              });
                        }

                    }
             }); //end catch section
}); // end batchdetails


////Add New student And Update Batches table -- implemented
router.post('/api/teacher/batch/student/new',function(req,res) {
        console.log("Insiderouter to add new student",req.body);
        var newrecord = {
          studentfname :req.body.studentfname,
          studentlname: req.body.studentlname,
          parentname: req.body.parentname,
          loginemail: req.body.loginemail,
          password : req.body.password,
          batchid:req.body.batchid
        };
        var insertstudent = {
             studentfname : '',
             studentlname : '',
             loginemail: '',
             password: ''
        };
        studentdetails
           .create(newrecord)
           .then(function(dbstudentdetails){
              insertedstudent ={
                studentfname : dbstudentdetails.studentfname,
                studentlname : dbstudentdetails.studentlname,
                loginemail : dbstudentdetails.loginemail,
                phonenumber : dbstudentdetails.parentphonenumber
              } ;
              console.log("Inserted student record",dbstudentdetails,req.body.batchid);
               return batchdetails.findOneAndUpdate({_id:req.body.batchid},
                 {$push:{students: dbstudentdetails._id}});
           }) 
           .then(function(data){
             console.log("Inserted student and updated batchdetails with studentid",data,"\n");
             res.json(insertedstudent);
           })
           .catch(function(err) {
                      console.log("error in student batch",err)
                         if (err.errmsg)
                         {
                              if( (err.errmsg).substr(0,6) === 'E11000')
                              {
                                console.log("Student Login - already exist");
                                res.json({error: "Student email already exist :"});
                              }
                              else {
                                console.log("Error in updating Batch and Student details",err)
                                res.json(err);
                              }
                         }
                        else {
                         console.log("Exceptional Error: ",err)
                           res.json(err);
                         }
           }); // End db studentdetails batchdetails
}); // End router



// Get All batch details -- implemented
router.get("/api/teacher/batch/all",(req,res) => {
      console.log("inside router to get all batch records");
        batchdetails.find({})
          //  .populate('students') /* Should be removed when click on batch to details of batch */
           .then((data) => {
               console.log("Batch details",data);
               res.json(data);
           }) 
           .catch((err) => {
             console.log("Error in fetching all batch details",err);
             res.json(err);
            });
});

// Get All Student Details
router.get("/api/teacher/students/all",(req,res) => {
   studentdetails.find({})
       .populate ({
         path: 'batchid',
         select: '_id batchdesc subject'})
       .then((data) => {
        console.log("student details",data);
        res.json(data);
        })
      .catch((err) => {
        console.log("Error in fetching all Student details",err);
        res.json(err);
      }); 
});

////Add Class details And Update Batches table - implemented
router.post('/api/teacher/batch/class/add',function(req,res) {
        console.log("Insiderouter to add class details",req.body);
      var newrecord = req.body;
        classdetails
           .create(new record)
           .then(function(dbclassdetails)
           {
              console.log("The class details entered : ",dbclassdetails)
              return batchdetails.findOneAndUpdate({_id:req.body.batch}, {$push:{classid:dbclassdetails._id}});
            })
           .then(function(data){
             console.log("Inserted class details and updated batchdetails with classid",data);
             res.json(data);
           })
           .catch(function(err){
             if (err)
             {
                 console.log("The Error",err)
                 res.json(err);
               }
           });
});

//To add class details(Attendance) -Get All Student details for the batch for class entry - implemented
router.get("/api/teacher/batch/:batchid", (req,res) => {
  console.log("In router - to fetch students for class",req.params.batchid);
    batchdetails.findOne({_id:req.params.batchid})
     .populate('students')
      .then((data) => {
           console.log("Result from batch - student",data);
           res.json(data);
      })
      .catch((err) => {
        console.log("Error is fetching records",err);
        res.json(err);
      });
});

//Delete Batch (cascading) - pending ()
router.delete("/api/teacher/batch/delete",(req,res) => {
     console.log("Inside delete route for batch to student to class");
     batchdetails.deleteOne({_id:req.body.batchid})
       .populate('class')
       .then((data) => {
         console.log("data",data);
       })
       .catch((error) => {
         console.log("Error",error);
       });
});

// Update Batch 
router.put("/api/teacher/batch/update",(req,res) => {
  console.log("The batch id: ",req.body.batchid);
      batchdetails.update(
        {_id: req.body.batchid},
        {$set: {batchdesc : req.body.batchdesc,
                subject: req.body.subject,
                level: req.body.level,
                rateperhour: req.body.rate}}
      ).then((data) => {
        console.log("Updated Batch detils",data)
        res.json(data)
      }).catch((error) => {
        console.log("Error",error);
        res.json("Error in updating batch details",error)
      });
});

// Add Student Record
router.post("/api/teacher/student/new",(req,res) => {
        let insertedstudent
          studentdetails 
          .create(req.body.newrecord)
          .then(function(dbstudentdetails){
             insertedstudent = {
              studentfname : dbstudentdetails.studentfname,
              studentlname : dbstudentdetails.studentlname,
              loginemail : dbstudentdetails.loginemail,
              phonenumber : dbstudentdetails.parentphonenumber,
              parentname : dbstudentdetails.parentname
             } ;
            console.log("Inserted student record",dbstudentdetails,req.body.batchid);
            res.json(insertedstudent);
          }).catch(function(err) {
                    console.log("error in student batch",err)
                        if (err.errmsg)
                        {
                            if( (err.errmsg).substr(0,6) === 'E11000')
                            { 
                              console.log("Student Login - already exist");
                              res.json({error: "Student email already exist :"});
                            }
                            else {
                              console.log("Error in Creating Student details",err)
                              res.json(err);
                            }
                        }
                      else {
                          console.log("Exceptional Error: ",err)
                          res.json(err);
                        }
          }); // end db studentdetails
}); // End router

// Update Student - to add batch enrolled
router.put("/api/teacher/studentbatch/update",(req,res) => {
      studentdetails.updateOne(
        {_id: req.body.studentid},
        {$set: {batchdesc : req.body.batchdesc,
            subject: req.body.subject,
            level: req.body.level,
          rate: req.body.rate}}
      ).then((data) => {
        console.log("Updated BAtch",data)
        res.json(data)
      }).catch((error) => {
        console.log("Error",error);
        res.json("Error in updating bacth details",error)
      }); // End studentdetails
}); // End router u

// Update Student details
router.put("/api/teacher/student/update/:id",(req,res) => {
  studentdetails.updateOne(
    {_id: req.params.id},
    {$set: {studentfname : req.body.stdfname,
        studentlname: req.body.stdlname,
        loginemail: req.body.stdemail,
        parentname: req.body.parentname,
        parentphonenumber: req.body.phonenumber}}
  ).then((data) => {
    console.log("Updated Student personal details",data)
    res.json(data)
  }).catch((error) => {
    console.log("Error - student personal details update",error);
    res.json("Error in updating student personal details",error)
  }); // End studentdetails db operation
}); // End of router update for student details

// Delete Student Details completely
router.delete('/api/teacher/student/delete/:id',(req,res) => {
       studentdetails.deleteOne({_id: req.params.id})
       .then((data) => {
          console.log("The deletion data",data);
          res.json(data);
       })
       .catch((error) => {
         console.log("Delete Student details completely",error);
         res.json(error);
       }); // End to delete studentdetails
}); // End of router delete student details

//Delete Student from a batch -- pending
router.delete('/api/batch/student/delete/',(req,res) => {
          batchdetails.findone({_id: req.body.batchid})
            .then((data) => {
                data.students.remove(req.params.studentid);
                return data.save();
            })
            .then(() => {
               studentdetails.remove({_id:req.params.studentid});
            })
            .then((data) => {
              console.log("Student delet",data);
              res.json(data);
            })
            .catch((err) => {
              console.log("Error in deleting student details",err);
              res.json(err);
            });
}); // end of router delete from batch

// Search Student & Batch Records
router.get('/api/teacher/search/:str',(req,res) => {
    let student_details
    let batch_details 
    // Search for Student details
    studentdetails
      .find({ $or :
        [
          {studentfname : req.params.str},
          {studentlname : req.params.str},
          {loginemail : req.params.str},
          {parentname : req.params.str},
          {parentphonenumber : req.params.str}
        ] })
      .then((studentdet) =>
        {
              student_details = studentdet;
              batchdetails.find({$or:[
                {batchdesc : req.params.str},
                {level: req.params.str},
                {subject: req.params.str}
              ]})
              .then((batchdet) => {
                console.log(studentdet,batchdet)
                  res.json ({studentdetails:studentdet,batchdetails:batchdet})
              })
              .catch((err) => {
                res.json(err)
              });
                // res.json(studentdet)
        })
      .catch((err) => {
        console.log("No records found",err);
        // res.json(err);
        res.json({err})
      }); // end fetch studentdetails records
}); // End of Router -- search 


//Visitors Login - API to get Channel Videos and serve front end
router.get("/api/visitors",(req,res) => {
    youtubechannel.channelVideos(process.env.API_Youtube_Key,process.env.API_Youtube_Channel,function(channellist){
        console.log("The Channellist",channellist.length);
        let videoid =[];
        for(let i =0; i < channellist.length;i++)
        {
            if(channellist[i].id.videoId)
            { 
              videoid.push({
                id:channellist[i].id.videoId,
                title:channellist[i].snippet.title,
                description:channellist[i].snippet.description,
                // thumbnail:channellist[i].snippet.thumbnails.default
              });
            } // end if
            console.log(videoid[i]);
          } // end for
        res.json(videoid);
    }); // End of youtube api
}); // end of visitors

// Fetch student records for the specific batch
router.get('/api/teacher/batch/student/class/details/:bid',(req,res) => {
   let batchid = req.params.bid;
   let studentrecords = [];
   console.log("The request - ",req.params)
   studentdetails.find({
     batchid : batchid
   }).then((records) => {
     console.log("Student records fetched for the batch",records);
     studentrecords = records.data;
       classdetails.find({
       batchid: batchid}).then((recs) => {
        console.log("Class details fetched --",recs, studentrecords);
        res.json({srecords : studentrecords, crecords : recs.data  });
         })  ;
  //  }).then((rec) => {
      
      
   }).catch((error) => {
     console.log("Unable to fetch student  and class records for the batch",error);
     res.json(error);
   }); // end Studentdetails find
});// end router

module.exports = router;
