require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/projectTrackerDB")
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });

// Routes
app.use("/", loginRoutes);
app.use("/",registerRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
// Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});