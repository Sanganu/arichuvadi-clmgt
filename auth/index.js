const express = require('express')
const router = express.Router()
const Students = require('../models/Students')
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
		//res.json({ user: cleanUser })
		//res.redirect('/ssignup' + {usecr:cleanUser})
		//getStudentDetails({user:cleanUser})   
		getStudentDetails(req,res)
	}
)

// router.post('/student/login',passport.authenticate('local',
//              ))

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/ssignup', (req, res) => {
	const { email, password } = req.body
	// ADD VALIDATION
	console.log("The Request - to create account",req.body)
	Students.findOne({ 'email': email }, (err, studentMatch) => {
		if (studentMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newStudent = new Students({
			email:email,
			name:name,
			password:password
		})
		console.log("New student",newStudent)
		newStudent.save((err, savedUser) => {
			if (err) return res.json(err)
			returnstudent = {
				email: savedUser.email,
				name: savedUser.name
			}
			console.log("return",returnstudent)
			return res.json(returnstudent)
		})
	})
})

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
                    populate: {
                      path: 'classid', select: 'homework lessoncovered students'
                    },
                    select: 'batchdesc subject level rateperhour'
                  })
                  .then((studentdet) =>
                    {
                            var classdetails = [];
                            // console.log("Studet",studentdet);
                            // console.log("batch",studentdet.batchid);
                            //  console.log("class",studentdet.batchid.classid);
                            for(let i = 0; i < studentdet.batchid.classid.length;i++)
                            {
                                var homework = studentdet.batchid.classid[i].homework;
                                var lesson = studentdet.batchid.classid[i].lessoncovered;
                                var attendance = studentdet.batchid.classid[i].students
                                console.log("for", attendance.indexOf(studentdet._id))
                                if ( attendance.indexOf(studentdet._id)!== -1)
                                {
                                  var present= "   Y";
                                }
                                else {
                                  var present= "N";
                                }
                                classdetails.push ({
                                        homework : homework,
                                        lesson: lesson,
                                        present: present
                                      });
                            } // end of for loop
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

                            res.json({studentrecord:studentrecord,classes:classdetails}) 
                          }) // end then
                            //return done(null,{studentrecord:studentrecord,classes:classdetails})                 })
                  .catch((err) => { 
                    console.log("Error - Invalid Student Credentials",err);
                    res.json(err);
                    //return done(null,false,req.flash('message','Invalid Student login credentials'));
                  }); //end catch
      }  // End else part
}

