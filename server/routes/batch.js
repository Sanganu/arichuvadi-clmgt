import { Router } from "express";
import Batchdetails from "../models/BatchDetails.js";
import { requireRole } from "../middleware/auth.js";

const router = Router();

const onlyBoard = requireRole(["board", "management"]);

//Create a new batch/cohort
router.post("/api/board/batch/new", onlyBoard, async (req, res, next) => {
  try {
    const { batchdesc, course, level, teacher, examDate, teacherModel } = req.body;
    if (!teacher) {
      return res.status(400).json({
        error: "Instructor is required.",
      });
    }

    const newrecord = {
      batchdesc,
      course,
      level,
      teacher,
      teacherModel: teacherModel === "Instructor" ? "Instructor" : "Boarddetails",
      ...(examDate ? { examDate: new Date(examDate) } : {}),
    };

    const created = await Batchdetails.create(newrecord);
    const populated = await Batchdetails.findById(created._id).populate("teacher");
    res.json(populated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message, details: err.errors });
    }
    next(err);
  }
});

//Get all batch
router.get("/api/board/batch/all", onlyBoard, async (_req, res, next) => {
  try {
    const batches = await Batchdetails.find({}).populate("teacher");
    res.json(batches);
  } catch (err) {
    next(err);
  }
});

//Update batch
router.put("/api/board/batch/update", onlyBoard, async (req, res, next) => {
  try {
    const rawTeacher = req.body.teacher;
    const teacherId =
      rawTeacher && typeof rawTeacher === "object" && rawTeacher.id
        ? rawTeacher.id
        : rawTeacher;

    let teacherModel = req.body.teacherModel;
    if (
      !teacherModel &&
      rawTeacher &&
      typeof rawTeacher === "object" &&
      rawTeacher.teacherModel
    ) {
      teacherModel =
        rawTeacher.teacherModel === "Instructor" ? "Instructor" : "Boarddetails";
    }

    const $set = {
      batchdesc: req.body.batchdesc,
      course: req.body.course,
      level: req.body.level,
      teacher: teacherId,
      examDate: req.body.examDate,
    };
    if (teacherModel === "Instructor" || teacherModel === "Boarddetails") {
      $set.teacherModel = teacherModel;
    }

    const result = await Batchdetails.updateOne({ _id: req.body.batchid }, { $set });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

//Remove Student

router.put("/api/board/batch/student/delete", onlyBoard, async (req, res, next) => {
  try {
    await Batchdetails.updateOne(
      { _id: req.body.batchid },
      { $pull: { students: req.body.studentid } }
    );
    const updated = await Batchdetails.findById(req.body.batchid);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
