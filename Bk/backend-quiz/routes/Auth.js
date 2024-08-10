// // routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
var jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var validator = require("email-validator");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const isEmail = validator.validate(email);

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        if (!isEmail) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        if (name.length < 6 || password.length < 6) {
            return res
                .status(400)
                .json({ message: "Minimum 6 characters are required" });
        }

        // Hash the password
        const bcryptPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username: name,
            email,
            password: bcryptPassword,
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        console.log(isPasswordValid);
        

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "AHsa@123", { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});



   
   

// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = new User({ username, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.status(200).json({ message: 'Logged in successfully' });
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.status(200).json({ message: 'Logged out successfully' });
// });

module.exports = router;