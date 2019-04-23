const express = require('express')
const router = express.Router()
const Students = require('../models/Students')
const passport = require('../passport')

// this route is just used to get the user basic info
router.get('/', (req, res, next) => {
	console.log('===== /student ===user!!======')
	console.log(req.student)
	if (req.student) {
		return res.json({ student: req.student })
	} else {
		return res.json({ student: null })
	}
})
  
router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('=======++++=========')
		next()
	},
	passport.authenticate('local'), 
	(req, res) => {
		console.log('POST to /login - passport.authenticate callback')
 
		getStudentDetails(req,res)
	}
)



router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/create', (req, res) => {
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

function getStudentDetails(req,res) {
  console.log("Get Student Details - Student Login Route");
  console.log("The session data",req.session.passport.user)
	
	if (req.session.passport.user.user.userdata._id === undefined){
     res.json({err:"Invalid credentials"});
   }
   else
   {   
             Students
                  .findOne({_id : req.session.passport.user.user.userdata._id})
                  .populate({
                    path: 'batchid',
                    select: 'batchdesc course teacher level',
                    populate: {
                      path: 'classid', select: 'homework lessoncovered classdate'
                    }                    
                  })
                  .then((studentdet) =>
                    {
                       var classdetails = [];
                      //  console.log("Studet",studentdet);
                      //  console.log("batch",studentdet.batchid);
                      //  console.log("class",studentdet.batchid[0].classid);
                       if( studentdet.batchid.length > 0)
                       {
                              if( studentdet.batchid[0].classid !== undefined)
                              {
                                      for(let i = 0; i < studentdet.batchid[0].classid.length; i++)

                                      {
                                          let { homework,lessoncovered,classdate } = studentdet.batchid[0].classid[i];
                                          classdetails.push ({
                                                  homework : homework,
                                                  lesson: lessoncovered, 
                                                  classdate: classdate      
                                                });
                                      } // end of for loop
                                } // end if part check for class
                              else {
                                  classdetails = [{homework: "No Class details Available"}];
                              }  // end check for class details     
                              var studentrecord = {
                                        stdid: studentdet._id,
                                        fname: studentdet.studentfname,
                                        lname: studentdet.studentlname,
                                        parent: studentdet.parentname,
                                        phone: studentdet.parentphonenumber,
                                        email: studentdet.loginemail,
                                        batch: studentdet.batchid[0].batchdesc || "Not available",
                                        subject: studentdet.batchid[0].course || "N/A",
                                        level: studentdet.batchid[0].level || "N/A",
                                        teacher: studentdet.batchid[0].teacher || "N/A"
                              }
                                    console.log("Valid student login",studentrecord);
                                    console.log("Classdetails array",classdetails);
                                    res.json({studentrecord:studentrecord,classes:classdetails});
                          } // end of if check for batch details
                          else
                          {
                            var studentrecord = {
                              stdid: studentdet._id,
                              fname: studentdet.studentfname,
                              lname: studentdet.studentlname,
                              parent: studentdet.parentname,
                              phone: studentdet.parentphonenumber,
                              email: studentdet.loginemail,
                              batch : "Student not enrolled in any batch contact Teacher",
                              subject: "N/A",
                              level: "N/A",
                              teacher: "N/A"
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

module.exports = router;

