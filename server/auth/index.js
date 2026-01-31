import {Router} from 'express';
const router = Router()
import Students from "../models/Students.js";
import Board from "../models/Management.js";
import passport from '../passport/index.js';


// this route is just used to get the student or teacher user basic info

router.get('/', (req, res, next) => {
	console.log('===== Auth-Index.js /student /Teacher ===user!!======')
	// console.log(req.session.passport.user.user)
	if (req.session.passport.user.user) {
		return res.json({ user: req.session.passport.user.user})
	} else {
		return res.json({ user: null })
	}
})


//Step:1
  
router.post(
	'/login',
	function(req, res, next) {
		//console.log(req.body)
		console.log('=======++Login Route++=========')
		next()
	},
	passport.authenticate('local'), 
	(req, res) => {
		console.log('POST to /login - Local strategy - passport.authenticate callback - auth/index.js')
 		getDetails(req,res)
	}
)

router.post('/logout', (req, res) => {
  console.log("Logout.......User - auth/index.js",req.user);
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
});



router.post('/student/create', (req, res) => {
	// ADD VALIDATION
	console.log("The Request - to create account - auth/index.js ",req.body)
      Students.findOne({ 'email': email.toLowerCase() }, (err, studentMatch) => {
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


function getDetails(req,res) {
  console.log("Get student Login Route - auth/index.js");
  console.log("The session data",req.session.passport.user)
	
	if (req.session.passport.user === undefined){
     res.json({err:"Invalid credentials - Please Login"});
   }
   else
   {   
         if(req.session.passport.user.user.usertype === "student")
           {  Students
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
                       console.log("batch",studentdet.batchid);
                       console.log("class",studentdet.batchid.classid);
                       if( studentdet.batchid)
                       {     classdetails = studentdet.batchid.classid
                              // if( studentdet.batchid.classid.length >0)
                              // {
                              //         for(let i = 0; i < studentdet.batchid[0].classid.length; i++)

                              //         {
                              //             let { homework,lessoncovered,classdate } = studentdet.batchid[0].classid[i];
                              //             classdetails.push ({
                              //                     homework : homework,
                              //                     lesson: lessoncovered, 
                              //                     classdate: classdate      
                              //                   });
                              //         } // end of for loop
                              //   } // end if part check for class
                              // else {
                              //     classdetails = [{homework: "No Class details Available",
                              //                     lesson:"Please contact Board members or Instructors"}];
                              // }  // end check for class details     
                              var studentrecord = {
                                        stdid: studentdet._id,
                                        fname: studentdet.studentfname,
                                        lname: studentdet.studentlname,
                                        parent: studentdet.parentname,
                                        phone: studentdet.parentphonenumber,
                                        email: studentdet.loginemail,
                                        batch: studentdet.batchid.batchdesc || "Not available",
                                        subject: studentdet.batchid.course || "N/A",
                                        level: studentdet.batchid.level || "N/A",
                                        teacher: studentdet.batchid.teacher || "N/A"
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
                              subject: "Please contact Board members",
                              level: "N/A",
                              teacher: "N/A"
                            }
                            classdetails = [{homework: "Please contact Board members.",
                            lesson:"for Batch Enrollment"}];
                            res.json({studentrecord:studentrecord,classes:classdetails}) ;
                            console.log("Valid Student Login",studentrecord);
                          } // end else part
                        }) // end of then -studentdetails check
                  .catch((err) => { 
                    console.log("Error - Invalid Student Credentials",err);
                    res.json(err);
                  
                  }); //end catch
                }else if(req.session.passport.user.user.usertype === "management"){
                 {Board.findOne({_id:req.session.passport.user.user.userdata._id})
                    // .populate({
                    //   path:batchId,
                    //   match:{'batchId':{'$ne':''}},
                    //   select:_id,batchdesc, course,level,students,classid
                    // })
                    .then((result) =>{
                      console.log("Management details fetched:",result);
                      res.json(result);
                    })
                    .catch((error) =>{
                      console.log("Error in fetching Management account details",error);
                      res.json(error);
                    });
                  } // else if teacher
           }    
      }  // End else part
}

export default router;