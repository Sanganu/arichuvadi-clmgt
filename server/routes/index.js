import { Router } from "express";
import Batchdetails from "../models/BatchDetails.js";
import Studentdetails from "../models/Students.js";
import Classdetails from "../models/Classdetails.js";
import Board from "../models/Management.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
const onlyBoard = requireRole(["board", "management"]);

//Add New student
router.post("/api/board/batch/student/new", onlyBoard, async (req, res, next) => {
  try {
    const newrecord = {
      studentfname: req.body.studentfname,
      studentlname: req.body.studentlname,
      parentname_1: req.body.parentname || req.body.parentname_1,
      parentname_2:req.body.parentname_2  || "",
      parentphonenumber_2:req.body.parentphonenumber_2||"",
      loginemail: (req.body.loginemail || "").toLowerCase(),
      password: req.body.password,
      batchid: req.body.batchid,
      parentphonenumber_1:
        req.body.parentphonenumber || req.body.parentphonenumber_1,
      grade_completed: req.body.levelcompleted || "",
      grade_enrolled: req.body.levelrequested || "",
      course_completed: req.body.course_completed || "",
      course_enrolled: req.body.course_enrolled || ""
    };

    const dbstudent = await Studentdetails.create(newrecord);
    await Batchdetails.findOneAndUpdate(
      { _id: req.body.batchid },
      { $push: { students: dbstudent._id } }
    );

    res.json({
      stdid: dbstudent._id,
      studentfname: dbstudent.studentfname,
      studentlname: dbstudent.studentlname,
      loginemail: dbstudent.loginemail,
      phonenumber: dbstudent.parentphonenumber_1,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Student email already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message, details: err.errors });
    }
    next(err);
  }
});

//fetch all details
router.get(
  "/api/batch/student/class/details/:bid",
  requireAuth(),
  async (req, res, next) => {
    try {
      const [students, classes] = await Promise.all([
        Studentdetails.find({ batchid: req.params.bid }),
        Classdetails.find({ batch: req.params.bid }),
      ]);
      res.json({ srecords: students, crecords: classes });
    } catch (err) {
      next(err);
    }
  }
);

//Search
router.get("/api/board/search/:str", onlyBoard, async (req, res, next) => {
  try {
    const re = { $regex: req.params.str, $options: "i" };

    const [studentdetails, batchdetails, managementdetails] = await Promise.all([
      Studentdetails.find({
        $or: [
          { studentfname: re },
          { studentlname: re },
          { loginemail: re },
          { parentname_1: re },
          { parentphonenumber_1: re },
        ],
      }),
      Batchdetails.find({
        $or: [{ batchdesc: re }, { level: re }, { course: re }],
      }),
      Board.find({
        $or: [
          { fname: re },
          { lname: re },
          { description: re },
          { loginemail: re },
          { designation: re },
          { phone: re },
          { skypeId: re },
        ],
      }).select("fname lname description designation loginemail phone"),
    ]);

    res.json({ studentdetails, batchdetails, managementdetails });
  } catch (err) {
    next(err);
  }
});

//Add class details to batch
router.post(
  "/api/instructor/batch/class/add",
  requireAuth(),
  async (req, res, next) => {
    try {
      const classRecord = await Classdetails.create(req.body);
      await Batchdetails.findOneAndUpdate(
        { _id: req.body.batch },
        { $push: { classid: classRecord._id } },
        { new: true }
      );
      res.json(classRecord);
    } catch (err) {
      next(err);
    }
  }
);

//Add  students to batch
router.put("/api/board/batch/student/", onlyBoard, async (req, res, next) => {
  try {
    await Batchdetails.findOneAndUpdate(
      { _id: req.body.batchid },
      { $push: { students: req.body.studentid } },
      { new: true }
    );
    const updated = await Studentdetails.findOneAndUpdate(
      { _id: req.body.studentid },
      { batchid: req.body.batchid }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

//Get batch details with student and class details
router.get("/api/board/batch/detail/:bid", requireAuth(), async (req, res, next) => {
  try {
    const records = await Batchdetails.findById(req.params.bid)
      .populate({ path: "students", select: "studentfname studentlname" })
      .populate({ path: "classid", select: "lessoncovered homework classdate" })
      .populate("teacher");

    res.json(records ? [records] : []);
  } catch (err) {
    next(err);
  }
});

//delete class details
router.put("/api/batch/class/delete/", onlyBoard, async (req, res, next) => {
  try {
    await Batchdetails.updateOne(
      { _id: req.body.batchid },
      { $pull: { classid: req.body.classid } }
    );
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// delete batch completely
router.delete(
  "/api/board/batch/delete/:batchid",
  onlyBoard,
  async (req, res, next) => {
    try {
      const batchResult = await Batchdetails.deleteOne({
        _id: req.params.batchid,
      });
      if (batchResult.deletedCount === 0) {
        return res.status(404).json({ error: "Batch not found" });
      }
      await Classdetails.deleteMany({ batch: req.params.batchid });
      res.json({ message: "Batch and class details deleted" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;