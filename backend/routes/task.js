const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      status,
      priority,
      assignee,
      dueDate,
    } = req.body;

    const task = new Task({
      title,
      description,
      projectId,
      status,
      priority,
      assignee,
      dueDate,
      userId: req.user.userId,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
});

// GET ALL TASKS FOR LOGGED-IN USER
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
  userId: req.user.userId,

});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
});

// GET ONE TASK
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
  _id: req.params.id,
  userId: req.user.userId,
}).populate({
  path: "projectId",
  model: "Project",
});
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
});

// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
});

// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
});

module.exports = router;