import { Router } from "express";
import bcrypt from "bcrypt";
import Boarddetails from "../models/Management.js";
import Instructordetails from "../models/Instructor.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
router.post("/api/board/new", async (req, res, next) => {
  try {
    const count = await Boarddetails.estimatedDocumentCount();
    if (count > 0) {
      // After bootstrap, only an existing board member can create another.
      if (!req.session?.user || req.session.user.role !== "board") {
        return res.status(401).json({ error: "Not authorized to create board members" });
      }
    }

    const member = await Boarddetails.create(req.body);
    return res.json({
      _id: member._id,
      fname: member.fname,
      lname: member.lname,
      loginemail: member.loginemail,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Board member already exists for this email" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message, details: error.errors });
    }
    return next(error);
  }
});

//List all board members
router.get("/api/board/all", requireAuth(), async (_req, res, next) => {
  try {
    const results = await Boarddetails.find(
      {},
      "fname lname loginemail designation phone zoomlink skypeId"
    );
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// To assign board members + instructors for any cohort/batch

router.get("/api/instructor/all", requireAuth(), async (_req, res, next) => {
  try {
    const [boardRows, instructorRows] = await Promise.all([
      Boarddetails.find({}, "fname lname").sort({ fname: 1, lname: 1 }).lean(),
      Instructordetails.find({}, "fname lname").sort({ fname: 1, lname: 1 }).lean(),
    ]);

    const fromBoard = boardRows.map((rec) => ({
      _id: rec._id,
      Fullname: `${rec.fname} ${rec.lname}`.trim(),
      teacherModel: "Boarddetails",
    }));
    const fromInstructor = instructorRows.map((rec) => ({
      _id: rec._id,
      Fullname: `${rec.fname} ${rec.lname}`.trim(),
      teacherModel: "Instructor",
    }));
    res.json([...fromBoard, ...fromInstructor]);
  } catch (error) {
    next(error);
  }
});

//Board members login

router.post("/api/board/login", async (req, res, next) => {
  try {
    const { loginemail, password } = req.body;
    if (!loginemail || typeof password !== "string") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const boardMember = await Boarddetails.findOne({
      loginemail: loginemail.toLowerCase(),
    }).select("+password");

    if (!boardMember || typeof boardMember.password !== "string") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, boardMember.password);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    req.session.user = {
      id: boardMember._id,
      loginemail: boardMember.loginemail,
      role: "board", // canonical role used by middleware
      name: boardMember.fullName,
    };
    req.session.isAuthenticated = true;

    req.session.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return res.json({
        message: "Login successful",
        name: boardMember.fullName,
        fname: boardMember.fname,
        lname: boardMember.lname,
        description: boardMember.description,
        designation: boardMember.designation,
        email: boardMember.loginemail,
        phone: boardMember.phone,
        zoomlink: boardMember.zoomlink,
        skypeId: boardMember.skypeId,
        _id: boardMember._id,
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post("/api/board/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("board.sid");
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/api/board/me", (req, res) => {
  if (!req.session?.isAuthenticated) {
    return res.status(401).json({ error: "Not logged in" });
  }
  res.json(req.session.user);
});

export default router;
