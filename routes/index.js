const path = require("path");
const router = require("express").Router();
const batchdetails = require('../models/BatchDetails.js')
const studentdetails = require('../models/Students.js')
const classdetails = require('../models/Classdetails.js')


const passport = require("passport");


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
router.post('/api/teacher/student/new',function(req,res) {
        console.log("Insiderouter to add new student",req.body);
        // 
        var newrecord = {
          studentfname :req.body.studentfname,
          studentlname: req.body.studentlname,
          parentname: req.body.parentname,
          loginemail: req.body.loginemail,
          parentphonenumber: req.body.parentphonenumber,
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
                password: dbstudentdetails.password
              } ;
              console.log("Inserted student record",dbstudentdetails,req.body.batchid);
               return batchdetails.findOneAndUpdate({_id:req.body.batchid},
                 {$push:{students: dbstudentdetails._id}});
           })
           .then(function(data){
             console.log("Inserted student and updated batchdetails with studentid",data,"\n");
             res.json(insertedstudent);
           })
           .catch(function(err){
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
           });
});



// Get All batch details -- implemented
router.get("/api/teacher/batch/all",(req,res) => {
      console.log("inside router to get all batch records");
        batchdetails.find({})
           .populate('students')
           .then((data) => {
               console.log("Batch details",data);
               res.json(data);
           })
           .catch((err) => {
             console.log("Error in fetching all batch details",err);
             res.json(err);
            });
});

////Add Class details And Update Batches table - implemented
router.post('/api/teacher/batch/class/add',function(req,res) {
        console.log("Insiderouter to add class details",req.body);
      var newrecord = req.body;
        classdetails
           .create(newrecord)
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
     batchdetails.findOne({_id:req.body.batchid})
       .populate('class')
       .then((data) => {
         console.log("data",data);
       })
       .catch((error) => {
         console.log("Error",error);
       })
})



//Search Option: -- pending-working
router.get("/api/teacher/batch/:searchstr",(req,res) => {
    batchdetails.find({batchdesc : req.params.searchstr})
       .then((data) => {
         console.log("The response",data)
         res.json(data);
       })
       .catch((error) => {
         console.log("Search string batch not found",error);
         res.json({err:"Batch details does not exit"});
       });
});


//Delete Student -- pending
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
});

// Search Student Records

router.get('/api/teacher/studentdetails/:str',(req,res) => {
    studentdetails
      .find({ $or :
        [
          {studentfname : req.params.str},
          {studentlname : req.params.str},
          {loginemail : req.params.str},
          {parentname : req.params.str},
          {parentphonenumber : req.params.str}
        ] })
      .populate({
         path: 'batchid',
         select: 'batchdesc subject level rateperhour'
       })
       .then((studentdet) =>
        {
                var classdetails = [];
                console.log("Studet",studentdet);
                res.json(studentdet)
       
      })
      .catch((err) => {
        console.log("No records found",err);
        res.json(err);
      });
  
});

// Student Login route -- implemented- with OAuth Local

// router.post('/api/student/details',function(req,res,next) {
//   console.log("Inside route to fetch student details after valid student",req.body);
//   if (req.session.passport.user === undefined){
//     res.json({err:"Invalid credentials"});
//   }
//   else
//   {
//             studentdetails
//                  .findOne({ $and:[
//                            {_id : req.session.passport.user._id},
//                            {loginemail: req.session.passport.user.email}
//                            ]})
//                  .populate({
//                    path: 'batchid',
//                    populate: {
//                      path: 'classid', select: 'homework lessoncovered students'
//                    },
//                    select: 'batchdesc subject level rateperhour'
//                  })
//                  .then((studentdet) =>
//                    {
//                            var classdetails = [];
//                            // console.log("Studet",studentdet);
//                            // console.log("batch",studentdet.batchid);
//                            //  console.log("class",studentdet.batchid.classid);
//                            for(let i = 0; i < studentdet.batchid.classid.length;i++)
//                            {
//                                var homework = studentdet.batchid.classid[i].homework;
//                                var lesson = studentdet.batchid.classid[i].lessoncovered;
//                                var attendance = studentdet.batchid.classid[i].students
//                                // console.log("for",homework,lesson,attendance);
//                                console.log("Atte-DET",attendance,studentdet._id)
//                                if ( attendance.indexOf(studentdet._id))
//                                {
//                                  var present= "Y";
//                                }
//                                else {
//                                  var present= "N";
//                                }  
//                                classdetails.push ({
//                                        homework : homework,
//                                        lesson: lesson,
//                                        present: present
//                                      });
//                            } // end of for loop
//                            var studentrecord = {
//                                fname: studentdet.studentfname,
//                                lname: studentdet.studentlname,
//                                parent: studentdet.parentname,
//                                 phone: studentdet.parentphonenumber,
//                                email: studentdet.loginemail,
//                                uname: studentdet.username,
//                                batch: studentdet.batchid.batchdesc,
//                                subject: studentdet.batchid.subject,
//                                level: studentdet.batchid.level,
//                                rate: studentdet.batchid.rateperhour,
//                            }
//                            // console.log("Valid student login",studentrecord);
//                            // console.log("Classdetails array",classdetails);

//                            res.json({studentrecord:studentrecord,classes:classdetails}) 
//                          }) // end then
//                            //return done(null,{studentrecord:studentrecord,classes:classdetails})                 })
//                  .catch((err) => {
//                    console.log("Error - Invalid Student Credentials",err);
//                    res.json(err);
//                    //return done(null,false,req.flash('message','Invalid Student login credentials'));
//                  }); //end catch 
//      }  // End else part

// });  // student login route


// Student Login route -- implemented --no auth -- OLDER VERSION
// router.post('/api/others/student/login',function(req,res) {
//   db.studentdetails
//    .findOne({ $and:[
//               {loginemail : req.body.semail},
//              {username : req.body.suname},
//              {passw: req.body.spword}
//              ]})
//    .populate({
//      path: 'batchid',
//      populate: {
//        path: 'classid', select: 'homework lessoncovered students'
//      },
//      select: 'batchdesc subject level rateperhour'
//    })
//    .then((studentdet) =>
//      {
//              var classdetails = [];
//              // console.log("Studet",studentdet);
//              // console.log("batch",studentdet.batchid);
//              // console.log("class",studentdet.batchid.classid);
//               for(let i = 0; i < studentdet.batchid.classid.length;i++)
//               {
//                   var homework = studentdet.batchid.classid[i].homework;
//                   var lesson = studentdet.batchid.classid[i].lessoncovered;
//                   var attendance = studentdet.batchid.classid[i].students
//                  //  console.log("for",homework,lesson,attendance);
//                  console.log(attendance,"ATT -DET",studentdet._id)
//                   if ( attendance.indexOf(studentdet._id))
//                   {
//                     var present= "Y";
//                   }
//                   else {
//                     var present= "N";
//                   }
//                   classdetails.push ({
//                          homework : homework,
//                          lesson: lesson,
//                          present: present
//                        });
//              }
//              var studentrecord = {
//                   fname: studentdet.studentfname,
//                   lname: studentdet.studentlname,
//                   parent: studentdet.parentname,
//                   phone: studentdet.parentphonenumber,
//                   email: studentdet.loginemail,
//                   uname: studentdet.username,
//                   batch: studentdet.batchid.batchdesc,
//                   subject: studentdet.batchid.subject,
//                   level: studentdet.batchid.level,
//                   rate: studentdet.batchid.rateperhour,
//               }
//              console.log("Valid student login",studentrecord);
//              console.log("Classdetails array",classdetails);
//              res.json({studentrecord:studentrecord,classes:classdetails});
//    })
//    .catch((err) => {
//      console.log("Error - Invalid Student Credentials",err);
//      res.json(err);
//    });

// });  // student login route



module.exports =router;



