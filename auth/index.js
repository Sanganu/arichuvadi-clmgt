const express = require('express')
const router = express.Router()
const passport = require('../passport')

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
// router.get(
// 	'/google/callback',
// 	passport.authenticate('google', {
// 		successRedirect: '/',
// 		failureRedirect: '/login'
// 	})
// )

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/student/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
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
});

//Invalid student login
router.get('/api/student/login/failure',function(req,res){
  console.log("failure login");
  res.json({err:"Invalid credentials"});
});
 
// //Passport Authentication Route
// router.post('/student/login',passport.authenticate('local',{
//   failureRedirect: '/api/student/login/failure',
//   successRedirect: '/api/student/details'
// }));
 
//  router.post('/student/login',function(req,res,next){
//    passport.authenticate('local',function(err,user,info){
//      if (err) { return next(err)}
//      if (!user) {
//        res.redirect('/api/student/login/failure')
//      }
//      req.logIn(user,function(err){
//        if (err) {return next(err);}
//            res.redirect('/api/student/details');
//      });
//    });
//  });

//  passport.authenticate('local',{
//   failureRedirect: '/api/student/login/failure',
//   successRedirect: '/api/student/details'
//  });

// router.post('/signup', (req, res) => {
// 	const { username, password } = req.body
// 	// ADD VALIDATION
// 	User.findOne({ 'local.username': username }, (err, userMatch) => {
// 		if (userMatch) {
// 			return res.json({
// 				error: `Sorry, already a user with the username: ${username}`
// 			})
// 		}
// 		const newUser = new User({
// 			'local.username': username,
// 			'local.password': password
// 		})
// 		newUser.save((err, savedUser) => {
// 			if (err) return res.json(err)
// 			return res.json(savedUser)
// 		})
// 	})
// })

module.exports = router
