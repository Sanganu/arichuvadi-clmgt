const path = require("path");
const router = require("express").Router();
const batchdetails = require('../models/BatchDetails.js')


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


  //Create new batch -- implemented
router.post('/api/teacher/batch/new', isLoggedIn, function (req, res) {
    var newrecord = req.body;
    //  console.log("Insiderouter to add new batch",req.body);
    console.log("Check Session - teacher login", req.session.passport.user.user.userdata._id);
    batchdetails
      .create(newrecord)
      .then(function (dbdetails) {
        console.log("Inserted record details", dbdetails);
        res.json(dbdetails);
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
          // var vrmsg = (err.errmsg).substr(0, 6);
          // if (vrmsg === 'E11000') {
          //   console.log("Batch ID already exist -- Please use different ID to create a new batch");
          //   res.json({
          //     errid: vrmsg,
          //     errstring: "Batch details already exist -- Please delete old batch and register again if this is a new batch",
          //     err: err
          //   });
          // }
          // else {
          //   console.log("Error on saving batch details", err);
          //   res.json({
          //     errid: 'OTHERS',
          //     errstring: "OTHERS -Error in saving Batch details",
          //     err: err
          //   });
          // }
  
        }
      }); //end catch section
  }); // end batchdetails -- create batch implemented

  // Get All batch details -- implemented
router.get("/api/teacher/batch/all", isLoggedIn, (req, res) => {
    console.log("<<<<Check Session - teacher login", req.session.passport);//undefined
    console.log("=================<<<<<<<<<===============");
    batchdetails.find({})
      // .populate({
      //   path:'teacher',
      //   select:'fname lname'}) /* Should be removed when click on batch to details of batch */
      .then((data) => {
        console.log("Batch details", data);
        res.json(data);
      })
      .catch((err) => {
        console.log("Error in fetching all batch details", err);
        res.json(err);
      });
  }); // Get all batch details -- implemented

  // Update Batch --implemented
router.put("/api/teacher/batch/update", isLoggedIn, (req, res) => {
    console.log("The batch id: ", req.body.batchid, req.session.passport.user.user.userdata._id);
    batchdetails.updateOne(
      { _id: req.body.batchid },
      {
        $set: {
          batchdesc: req.body.batchdesc,
          subject: req.body.subject,
          level: req.body.level,
          teacher: req.body.teacher
        }
      }
    ).then((data) => {
      console.log("Updated Batch detils", data)
      res.json(data)
    }).catch((error) => {
      console.log("Error", error);
      res.json("Error in updating batch details", error)
    });
  }); // Batch update --implemented

//trying this ----Delete student details from a batch-- v1 v2 -- working??
router.put('/api/board/batch/student/delete/', (req, res) => {
    console.log("Student delete from batch-inputs", req.body.batchid, req.body.studentid);
    batchdetails.updateOne({ _id: req.body.batchid },
      { $pull: { students: req.body.studentid } })
      .then((data) => {
        console.log("Student details delete from batch", data);
        batchdetails.findOne({ _id: req.body.batchid }, function (error, record) {
          if (error) res.json(error);
          console.log("Record after removing student", record);
          res.json(record);
        });
  
      })
      .catch((err) => {
        console.log("Error in deleting class details", err);
        res.json(err); student
      });
  }); // end of router to delete studentfrom batch

//Delete Student from a batch -- V3 -- working??
router.put('/api/batch/student/del/', (req, res) => {
  var stdid = req.body.studentid
  console.log("Student delete from batch-inputs", stdid);
  batchdetails.findOne({ "_id": req.body.batchid },
    function (error, record) {
      if (error) {
        console.log("Error in deleting student details", err);
        res.json(err);
      } else if (record) {
        var indexofitem = record.students ? record.students.indexOf(stdid) : -1;
        console.log("Before Index", record, record.students)
        if (indexofitem !== -1) {
          record.students.splice(indexofitem, 1);
          console.log("New Array", record.students)
          record.save(function (error) {
            if (error) console.log("Error in remove -student from batch", error);
            else {
              console.log("Student Removed from batch", record);
              res.json(record)
            };
          }); // end save
        } // end if of index
      }// end if of find record
    }); // end of callback for find record
}); // end of router delete student from batch

//Delete Batch -- implemented
router.delete("/api/board/batch/delete/:batchid",isLoggedIn, (req, res) => {
  console.log("Inside delete route for batch to student to class",req.params.batchid);
  const result =  batchdetails.deleteOne({ _id: req.params.batchid }).exec();
  if (result.n === 0) {
    console.log("Error", error);
    res.status(404).error({ "Error": "Error in deleting batch and class" + errror })
  }
  else {
    console.log("The result-n", result);
    const respdelclass =  classdetails.deleteMany({ batch: req.body.batchid }).exec();
    if (respdelclass.n === 0) {
      console.log("Error", error);
      res.status(404).error({ "Error": "Error in deleting class" + errror })
    }
    else {
      res.status(200).json({ "Deleted": "Batch and class details" });
    }
 }
});


//Delete student details from a batch-- v1 v2 -- working??
router.put('/api/batch/student/delete/', (req, res) => {
  console.log("Student delete from batch-inputs", req.body.batchid, req.body.studentid);
  batchdetails.updateOne({ _id: req.body.batchid },
    { $pull: { students: req.body.studentid } })
    .then((data) => {
      console.log("Student details delete from batch", data);
      batchdetails.findOne({ _id: req.body.batchid }, function (error, record) {
        if (error) res.json(error);
        console.log("Record after removing student", record);
        res.json(record);
      });

    })
    .catch((err) => {
      console.log("Error in deleting class details", err);
      res.json(err); student
    });
}); // end of router to delete studentfrom batch

module.exports = router;