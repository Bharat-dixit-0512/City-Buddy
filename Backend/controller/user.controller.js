import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userService from "../services/user.service.js";

dotenv.config();

// Signup controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // allow optional role when an admin secret is provided
    let { role, adminCode } = req.body || {};
    if (role === "admin") {
      // simple gate: require ADMIN_CODE in env to create admin
      if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
        role = "user"; // fallback
      }
    }

  // Check if user exists (service handles fallback)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await userService.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

    // Create user
      try {
        const result = await userService.create({
          username,
          email,
          password: hashedPassword,
          role: role || "user",
        });

        const createdUser = result.user || result;
        const usingFallback = result.usingFallback || false;

        res.status(201).json({ message: "User created successfully", user: { _id: createdUser._id, username: createdUser.username, email: createdUser.email, role: createdUser.role }, usingFallback });
      } catch (err) {
        if (err.code === "DUPLICATE_EMAIL") {
          return res.status(400).json({ message: "User already exists" });
        }
        // file system errors (ENOENT / EACCES) provide clearer messages
        if (err.code === "ENOENT" || err.code === "EACCES") {
          console.error("Filesystem error during user creation:", err);
          return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
        throw err; // let outer catch handle other errors
      }
  } catch (error) {
    console.error("Error: ", error);
    // Return error message in development to help debugging (remove or hide in production)
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  // Find user by email (service handles fallback)
  const user = await userService.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Success
    // create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    // detect if user came from fallback file store (no mongoose methods)
    const usingFallback = !(user && user._id && typeof user._id === "object") && !user.save;

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      usingFallback,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
