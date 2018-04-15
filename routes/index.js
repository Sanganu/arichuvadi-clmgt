 const path = require("path");
const router = require("express").Router();
const db = require('../models')

//Create new batch -- implemented
router.post('/api/teacher/batch/new',function(req,res) {
      var newrecord = req.body;
       console.log("Insiderouter to add new batch",req.body);

      db.batchdetails
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
}); // end db.batchdetails


////Add New student And Update Batches table -- implemented
router.post('/api/teacher/student/new',function(req,res) {
        console.log("Insiderouter to add new student",req.body);
        var uname = (req.body.studentfname).substr(0,1) +(req.body.studentlname);
        var pword = (req.body.parentphonenumber).substr(0,3) + (req.body.studentfname);
        var newrecord = {
          studentfname :req.body.studentfname,
          studentlname: req.body.studentlname,
          parentname: req.body.parentname,
          loginemail: req.body.loginemail,
          parentphonenumber: req.body.parentphonenumber,
          username : uname,
          passw : pword,
          batchid:[req.body.batchid]
        };
        var insertstudent = {
             studentfname : '',
             studentlname : '',
             loginemail: '',
             uname: '',
             pwd: ''
        };
        db.studentdetails
           .create(newrecord)
           .then(function(dbstudentdetails){
              insertedstudent ={
                studentfname : dbstudentdetails.studentfname,
                studentlname : dbstudentdetails.studentlname,
                loginemail : dbstudentdetails.loginemail,
                uname: dbstudentdetails.username,
                pwd: dbstudentdetails.passw
              } ;
              console.log("Inserted student record",dbstudentdetails);
              return db.batchdetails.findOneAndUpdate({_id:req.body.batchid}, {$push:{students:dbstudentdetails._id}});

           })
           .then(function(data){
             console.log("Inserted student and updated batchdetails with studentid",data);
             res.json(insertedstudent);
           })
           .catch(function(err){
                   if (err)
                   {
                         var vrmsg  = (err.errmsg).substr(0,6);
                         if( vrmsg === 'E11000')
                         {
                           console.log("Student Login - already exist");
                           res.json({error: "Student email already exist :"});
                         }
                         else {
                           console.log("The Error",err)
                           res.json(err);
                         }
                   }
           });
});



// Get All batch details -- implemented
router.get("/api/teacher/batch/all",(req,res) => {
      console.log("inside router to get all batch records");
        db.batchdetails.find({})
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

// Student Login route -- implemented
router.post('/api/others/student/login',function(req,res) {
   console.log("Inside route to validate student loginemail",req.body);
   db.studentdetails
     .findOne({ $and:[
                {loginemail : req.body.semail},
               {username : req.body.suname},
               {passw: req.body.spword}
               ]})
     .populate({
       path: 'batchid',
       populate: {
         path: 'classid', select: 'homework lessoncovered students'
       },
       select: 'batchdesc subject level rateperhour'
     })
     .then((studentdet) =>
       {
               var classdetails = [];
               console.log("Studet",studentdet);
               console.log("batch",studentdet.batchid);
               console.log("class",studentdet.batchid.classid);
               for(let i = 0; i < studentdet.batchid.classid.length;i++)
                {
                    var homework = studentdet.batchid.classid[i].homework;
                    var lesson = studentdet.batchid.classid[i].lessoncovered;
                    var attendance = studentdet.batchid.classid[i].students
                    console.log("for",homework,lesson,attendance);

                    if ( attendance.indexOf(studentdet._id))
                    {
                      var present= "Y";
                    }
                    else {
                      var present= "N";
                    }
                    classdetails.push ({
                           homework : homework,
                           lesson: lesson,
                           present: present
                         });
               }
               var studentrecord = {
                    fname: studentdet.studentfname,
                    lname: studentdet.studentlname,
                    parent: studentdet.parentname,
                    phone: studentdet.parentphonenumber,
                    email: studentdet.loginemail,
                    uname: studentdet.username,
                    batch: studentdet.batchid.batchdesc,
                    subject: studentdet.batchid.subject,
                    level: studentdet.batchid.level,
                    rate: studentdet.batchid.rateperhour,
                }
               console.log("Valid student login",studentrecord);
               console.log("Classdetails array",classdetails);
               res.json({studentrecord:studentrecord,classes:classdetails});
     })
     .catch((err) => {
       console.log("Error - Invalid Student Credentials",err);
       res.json(err);
     });

});  // student login route





////Add Class details And Update Batches table - implemented
router.post('/api/teacher/batch/class/add',function(req,res) {
        console.log("Insiderouter to add class details",req.body);
      var newrecord = req.body;
        db.classdetails
           .create(newrecord)
           .then(function(dbclassdetails)
           {
              console.log("The class details entered : ",dbclassdetails)
              return db.batchdetails.findOneAndUpdate({_id:req.body.batch}, {$push:{classid:dbclassdetails._id}});
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







//To ddd class details -Get All Student details for the batch for class entry - implemented
router.get("/api/teacher/batch/:batchid", (req,res) => {
  console.log("In router",req.params.batchid);
  //var bid = mongoose.Types.ObjectId.fromString(batchid);
  db.batchdetails.findOne({_id:req.params.batchid})
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
     db.batchdetails.findOne({_id:req.body.batchid})
       .populate('class')
       .then((data) => {
         console.log("data",data);
       })
       .catch((error) => {
         console.log("Error",error);
       })
})



//Search Option: -- pending
router.get("/api/teacher/batch/:searchstr",(req,res) => {
    db.batchdetails.find({batchdesc : req.params.searchstr})
       .then((data) => {
         console.log("The response",data)
         res.json(data);
       })
       .catch((error) => {
         console.log("Search string batch not found",error);
         res.json({err:"Batch details does not exit"});
       })
});



// Route to get maxbat
/*
router.get('/api/teacher/batch/maxid',function(req,res) {
        console.log("in the router to get max");

        db.batchdetails
           .find({$max : "$batchid"})
           .then(function(data){
             res.json(data);
           })
           .catch(function(err){
             if (err)
             {
               console.log("error...",err);
               res.json(err);
             }
           });
});
*/

//Delete Student -- pending
router.delete('/api/batch/student/delete/',(req,res) => {
          db.batchdetails.findone({_id: req.body.batchid})
            .then((data) => {
                data.students.remove(req.params.studentid);
                return data.save();
            })
            .then(() => {
              db.studentdetails.remove({_id:req.params.studentid});
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

module.exports =router;



// .exec(function(err,data){
//   if (err) return res.json(err);
//   console.log('The Result from fetch student and batch',data);
//   res.json(data);
// });
