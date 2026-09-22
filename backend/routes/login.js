const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log("Email:", email);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token: token
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

});

module.exports = router;