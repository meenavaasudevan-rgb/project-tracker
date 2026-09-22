const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Not Started"
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;