
const router = require("express").Router();
const Management = require('../models/Management.js');


const isLoggedIn = (req, res, next) => {
    console.log("Routes - req isloggedin", req.user)
    if (!req.user) {
      // USer is not logged in
      console.log("Routes isLoggedIn- No user data found", req.user)
      res.redirect("/");
    }
    else {
      console.log("Routes-IsloggedIn-USer logged in", req.user);
      next();
    }
  }


  //board teacher registration ---> NEED TO RETHINK ON THIS ONE
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
          res.status(500).send({ "err": "Board member already exist for this Email ID", "errcode": (error.errmsg) });
        }
        else {
          console.log("Unable to create board member account", error)
          res.status(500).send({ "err": "Unable to create board member Account ", "errcode": error.errmsg });
        }
      })
  });


//Router to get all Board Members only

router.get('/api/board/all',(req,res)=>{
Management.find({fname,lname,loginemail,designation,phone,zoomlink,skypeId})
  .then((results) => {
     console.log("Records fetched for Management",results);
     res.json(results);
  })
  .catch((error) => {
    console.log("Error in fetching",error);
    res.json(error);
  });
});


// ALL Instructor details - Teachers and Board
router.get('/api/instructor/all', (req, res) => {
  let list =[]
  Management.aggregate([{$project: {Fullname:{$concat:["$fname"," ","$lname"]}}}])
  .then((allinst) => {
      // list = results
      // console.log("Records fetched for teachers", results);
    //   return Teacher.find({},'fname lname')
    // })
    // .then(function (allinstructors) {
    //   // console.log(allinstructors)
    //   let allinst = list.concat(allinstructors)
      console.log("All Instructors",allinst)
      res.json(allinst);
    })
    .catch((error) => {
          console.log("Error in fetching", error);
          res.json(error);
    });
});

  module.exports = router;
