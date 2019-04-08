const express = require('express')
const router = express.Router()
const Students = require('../models/Students');
const Teachers = require("../models/Teachers");
const passport = require('../passport')

// this route is just used to get the user basic info
router.get('/student', (req, res, next) => {
	console.log('===== /student ===user!!======')
	console.log(req.student)
	if (req.student) {
		return res.json({ student: req.student })
	} else {
		return res.json({ student: null })
	}
})
  
router.post(
	'/student/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('=======++++=========')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login - passport.authenticate callback')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`)
			delete cleanUser.password
		}
		getStudentDetails(req,res)
	}
)


router.get("/teacher/login",(req,res) =>{
    res.json({"msg":"send to google"});
});

//Make the google account screen display
router.get("/teacher/google",passport.authenticate('google',{
    scope:['profile']
}));

//The callback 
router.get("/auth/google/teacher",passport.authenticate("google"),(req,res) => {
    console.log("The router callback");
});

router.post( '/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/student/create', (req, res) => {
	// ADD VALIDATION
	console.log("The Request - to create account",req.body)
      Students.findOne({ 'email': email }, (err, studentMatch) => {
        if (studentMatch) {
          return res.json({
            error: `Sorry, already a user with the username: ${username}`
          })
        }
        else
        {
          Students.create(req.body.newrecord)
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
          }).catch(err => {
            res.json(err)
          }) // end create new record
        } // end else part
      }); // end student findone
}); // end route

module.exports = router

function getStudentDetails(req,res) {
	console.log("Get Student Details", req.session.passport.user._id)
	if (req.session.passport.user._id === undefined){
     res.json({err:"Invalid credentials"});
   }
   else
   {   
             Students
                  .findOne({_id : req.session.passport.user._id})
                  .populate({
                    path: 'batchid',
                    select: 'batchdesc subject level rateperhour',
                    populate: {
                      path: 'classid', select: 'homework lessoncovered students'
                    }                    
                  })
                  .then((studentdet) =>
                    {
                       var classdetails = [];
                       console.log("Studet",studentdet);
                       console.log("batch",studentdet.batchid);
                       console.log("class",studentdet.batchid[0].classid);
                       if( studentdet.batchid.length > 0)
                       {
                              if( studentdet.batchid[0].classid !== undefined)
                              {
                                      for(let i = 0; i < studentdet.batchid[0].classid.length; i++)

                                      {
                                          let { homework,lesson,classdate } = studentdet.batchid[0].classid[i];
                                          classdetails.push ({
                                                  homework : homework,
                                                  lesson: lesson,
                                                  classdate: classdate      
                                                });
                                      } // end of for loop
                                } // end if part check for class
                                else {
                                  classdetails = [{homework: "No Class details Available"}];
                                }  // end check for class details     
                                    var studentrecord = {
                                        fname: studentdet.studentfname,
                                        lname: studentdet.studentlname,
                                        parent: studentdet.parentname,
                                        phone: studentdet.parentphonenumber,
                                        email: studentdet.loginemail,
                                        batch: studentdet.batchid[0].batchdesc || "Student not enrolled in any batch",
                                        subject: studentdet.batchid[0].subject || "N/A",
                                        level: studentdet.batchid[0].level || "N/A",
                                        rate: studentdet.batchid[0].rateperhour || "N/A" 
                                    }
                                    console.log("Valid student login",studentrecord);
                                    console.log("Classdetails array",classdetails);
                                    res.json({studentrecord:studentrecord,classes:classdetails});
                          } // end of if check for batch details
                          else
                          {
                            var studentrecord = {
                              fname: studentdet.studentfname,
                              lname: studentdet.studentlname,
                              parent: studentdet.parentname,
                              phone: studentdet.parentphonenumber,
                              email: studentdet.loginemail,
                              batch : "Student not enrolled in any batch contact Teacher"
                            }
                            res.json({studentrecord:studentrecord}) ;
                            console.log("Valid Student Login",studentrecord);
                          } // end else part
                        }) // end of then -studentdetails check
                  .catch((err) => { 
                    console.log("Error - Invalid Student Credentials",err);
                    res.json(err);
                    //return done(null,false,req.flash('message','Invalid Student login credentials'));
                  }); //end catch
      }  // End else part
}

