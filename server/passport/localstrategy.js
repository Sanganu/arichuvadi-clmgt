import Students from '../models/Students.js';
import Board from "../models/Management.js"; 
import Instructor from "../models/Instructor.js";
import { Strategy as LocalStrategy } from "passport-local";

const strategy = new LocalStrategy(
	{
		usernameField: 'loginemail',// not necessary, DEFAULT
		usertype:'usertype',
		passReqToCallback:true 
	},
		function(req,loginemail, password, done) {
				   console.log("=+++++Local Strategy Setup+++++++++");
				   
				   //console.log("Passport addition field",loginemail,password,req.body.usertype);
				//    console.log("Passport Local Strategy - User Type",req.body.usertype,loginemail);
				   if (req.body.usertype === "student"){
					Students.findOne({ 'loginemail': {"$regex":loginemail,"$options":"i"}})
						.select("+password")
						.exec((err, studentMatch) => {
						// console.log("The Local strategy - to find the Student",studentMatch);
						if (err) {
							return done(err)
						}
						if (!studentMatch) {
							return done(null, false, { message: 'Incorrect Email' })
						}
						if (!studentMatch.checkPassword(password)) {
							return done(null, false, { message: 'Incorrect password' })
						}
						return done(null, {usertype:"student",userdata:studentMatch})
					    });
					}	
					else if(req.body.usertype === "instructor"){
						Instructor.findOne({'loginemail': {"$regex": loginemail, "$options":"i"}},(err, teacherMatch) => {
							// console.log("The local strategy to find the Teacher");
							console.log("-----------------------------------------");
							if(err){
								return done(err)
							}
							if(!teacherMatch){
								return done(null,false,{message: 'Incorrect Email'})
							}
							if(!teacherMatch.checkPassword(password)){
								return done(null,false,{message:"Incorrect Password"})
							}
							return done(null,{usertype:"teacher",userdata:teacherMatch})
						});
					}
					else if(req.body.usertype === "management"){
						Board.findOne({'loginemail': {"$regex": loginemail, "$options":"i"}})
						.select("+password")
						.exec((err, teacherMatch) => {
							// console.log("The local strategy to find the Teacher");
							// console.log("-----------------------------------------");
							if(err){
								return done(err)
							}
							if(!teacherMatch){
								return done(null,false,{message: 'Incorrect Email'})
							}
							if(!teacherMatch.checkPassword(password)){
								return done(null,false,{message:"Incorrect Password"})
							}
							return done(null,{usertype:"management",userdata:teacherMatch})
						});
					}
		}
)

export default strategy;