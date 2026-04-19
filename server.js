require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const noticeRoutes = require("./routes/noticeRoutes");
app.use("/api/notices", noticeRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});