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

// router.post(
// 	'/student/login',
// 	passport.authenticate('local'),
// 	function(req, res) {
// 		console.log('POST to /login - passport.authenticate callback')
// 		const user = JSON.parse(JSON.stringify(req.user)) // hack
// 		const cleanUser = Object.assign({}, user)
// 		if (cleanUser) {
// 			console.log(`Deleting ${cleanUser.password}`)
// 			delete cleanUser.password
// 		}
// 		res.json({ user: cleanUser })
// 	} // end function
// )
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
		res.json({ user: cleanUser })
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

router.post('/ssignup', (req, res) => {
	const { email,name, password } = req.body
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
