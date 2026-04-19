const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}


// Create Notice
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Not allowed" });
  }

  const notice = new Notice(req.body);
  await notice.save();
  res.json(notice);
});

// Get All Notices
router.get("/", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});

module.exports = router;