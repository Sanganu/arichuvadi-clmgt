const path = require("path");
const router = require("express").Router();
const Management = require('../models/Management.js');


const isLoggedIn = (req, res, next) => {
    console.log("Routes - req isloggedin", req.user)
    if (!req.user) {
      // USer is not logged in
      console.log("Routes isLoggedIn- No user data found", req.user)
      res.redirect("/login");
    }
    else {
      console.log("Routes-IsloggedIn-USer logged in", req.user);
      next();
    }
  }


  //board teacher
router.post('/api/board/new', (req, res) => {
    console.log("Board Member creation -", req.body);
    Management.create(req.body)
      .then((response) => {
        console.log("Board Member details created", response);
        res.json(response);
      })
      .catch((error) => {
        if (error == 'E11000') {
          console.log("Board  Detials already exist", error);
          res.send({ "err": "Board member already exist for this Email ID", "errcode": (error.errmsg) });
        }
        else {
          console.log("Unable to create board member account", error)
          res.send({ "err": "Unable to create board member Account ", "errcode": error.errmsg });
        }
      })
  });


//Router to get all teacher details

router.get('/api/board/all',(req,res)=>{
Management.find({})
  .then((results) => {
     console.log("Records fetched for teachers",results);
     res.json(results);
  })
  .catch((error) => {
    console.log("Error in fetching",erroboardr);
    res.json(error);
  });
});



  module.exports = router;
