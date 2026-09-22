const User = require("../models/User");

const express = require("express");
const bcrypt = require("bcrypt");


const router = express.Router();

router.post("/register", async(req, res) => {
    const { name,email, password } = req.body;
    const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({
        success: false,
        message: "Email already exists"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
    name,
    email,
    password: hashedPassword
});
await newUser.save();

console.log("Hashed Password:", hashedPassword);


    console.log("Name:",name)
    console.log("Email:",email);
    

    res.json({
        success: true,
        message: "User Registered  successfully"
    });
});
module.exports=router;