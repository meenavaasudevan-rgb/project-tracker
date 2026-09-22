const express = require("express");
const Project = require("../models/project");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
    
    try {
const { name, description, status } = req.body;

const project = await Project.create({
    name,
    description,
    status,
    userId: req.user.userId
});
res.status(201).json({
        success: true,
        message: "Project created successfully",
        project
    });
 } catch (error) {
        console.error("Create project error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});
router.get("/", authMiddleware, async (req, res) => {
try{
const projects = await Project.find({
    userId: req.user.userId
});
res.status(200).json({
    success: true,
    projects
});
}

catch(error){
console.error("Get projects error:", error);

res.status(500).json({
    success: false,
    message: "Server error"
});
}

});
router.put("/:id", authMiddleware, async (req, res) => {
    try{
        const { name, description, status } = req.body;
    const project = await Project.findOneAndUpdate(
        {
        _id: req.params.id,
        userId: req.user.userId
        },
    {
        name,
        description,
        status
    },
    
    { new: true }
);
if (!project) {
    return res.status(404).json({
        success: false,
        message: "Project not found"
    });
}
res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project
});
    }

catch(error){
console.error("Update project error:", error);

res.status(500).json({
    success: false,
    message: "Server error"
});
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try{
    const project = await Project.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId
    });
if (!project) {
    return res.status(404).json({
        success: false,
        message: "Project not found"
    });
}
res.status(200).json({
    success: true,
    message: "Project deleted successfully"
});



}  catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
        success: false,
        message: "Server error"
    });
}
    });



module.exports = router;