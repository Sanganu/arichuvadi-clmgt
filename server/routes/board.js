
import {Router} from "express";
const router = Router()
import Boarddetails from "../models/Management.js";
import Instructordetails from "../models/Instructor.js";
import bcrypt from "bcrypt";


const isLoggedIn = (req, res, next) => {
    const sessionUser = req.session?.user;
    const passportUser = req.user;
    const user = sessionUser || passportUser;
    const role = sessionUser?.role || passportUser?.usertype;

    console.log("Routes - req isloggedin", user);
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (role !== "board" && role !== "management") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  }


  //board teacher registration ---> NEED TO RETHINK ON THIS ONE
router.post('/api/board/new', (req, res) => {
    console.log("Board Member creation -", req.body);
    Boarddetails.create(req.body)
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
  Boarddetails.find({fname,lname,loginemail,designation,phone,zoomlink,skypeId})
    .then((results) => {
      console.log("Records fetched for Boarddetails",results);
      res.json(results);
    })
    .catch((error) => {
      console.log("Error in fetching",error);
      res.json(error);
    });
});

// List instructors: board members + instructor accounts (BatchDetails.teacherModel)
router.get('/api/instructor/all', async (req, res) => {
  try {
    const [boardRows, instructorRows] = await Promise.all([
      Boarddetails.find({}, 'fname lname').sort({ fname: 1, lname: 1 }).lean(),
      Instructordetails.find({}, 'fname lname').sort({ fname: 1, lname: 1 }).lean()
    ]);
    const fromBoard = boardRows.map((rec) => ({
      _id: rec._id,
      Fullname: `${rec.fname} ${rec.lname}`.trim(),
      teacherModel: 'Boarddetails'
    }));
    const fromInstructor = instructorRows.map((rec) => ({
      _id: rec._id,
      Fullname: `${rec.fname} ${rec.lname}`.trim(),
      teacherModel: 'Instructor'
    }));
    res.json([...fromBoard, ...fromInstructor]);
  } catch (error) {
    console.log("Error in fetching instructors", error);
    res.status(500).json({ error: "Unable to fetch instructors" });
  }
});


// Boarddetails Board Login
router.post("/api/board/login", async (req, res) => {
  try {
    const { loginemail, password } = req.body;
    console.log("POST LOGIN ROUTe",loginemail,password)

    const boardMember = await Boarddetails.findOne({ loginemail }).select(
      "+password"
    );
    if (!boardMember) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (
      typeof password !== "string" ||
      typeof boardMember.password !== "string"
    ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, boardMember.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Set session values
    req.session.user = {
      id: boardMember._id,
      loginemail: boardMember.loginemail,
      role: "board",
      name:boardMember.fullName
    };

    req.session.isAuthenticated = true;
    console.log(req.session)

    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session save error:", saveErr);
        return res.status(500).json({ error: "Session error" });
      }

      return res.json({
        message: "Login successful",
        name:boardMember.fullName,
        fname:boardMember.fname,
        lname:boardMember.lname,
        description:boardMember.description,
        designation:boardMember.designation,
        email:boardMember.loginemail,
        phone:boardMember.phone,
        zoomlink:boardMember.zoomlink,
        skypeId:boardMember.skypeId,
        _id:boardMember._id
      });
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/api/board/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    res.clearCookie("board.sid");
    res.json({ message: "Logged out successfully" });
  });
});


router.get("/api/board/me", (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.status(401).json({ error: "Not logged in, Please login!" });
  }

  res.json(req.session.user);
});

 export default router;
 