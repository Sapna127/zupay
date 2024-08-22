const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const { z } = require('zod');

const { JWT_SECRET } = process.env;

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8)
});

//signup
const registerUser = async (req, res) => {
    try {
        const { success } = userSchema.safeParse(req.body);

        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            });
        }

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: "An error occurred while registering the user"
        });
    }
};

// Sign-in
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

const loginUser = async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({
            message: "Signin successful",
            token
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
