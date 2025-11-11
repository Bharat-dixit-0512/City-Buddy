import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/usermodel.js";
import Place from "../model/place.model.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let { role, adminCode } = req.body || {};
    if (role === "admin") {
      if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
        role = "user";
      }
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );
    const userWithoutPassword = await User.findById(user._id);
    res.status(200).json({
      message: "Login Successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const toggleFavorite = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;
  
  try {
    const user = await User.findById(userId);
    const favIndex = user.favorites.findIndex(
      (fav) => fav.item.toString() === itemId
    );
    if (favIndex > -1) {
      user.favorites.splice(favIndex, 1);
    } else {
      user.favorites.push({ item: itemId });
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
        path: 'favorites.item',
        model: 'Place'
    });
    const validFavorites = user.favorites.map(fav => fav.item).filter(Boolean);
    res.status(200).json(validFavorites);
  } catch (error) { // <-- This is the corrected line
    res.status(500).json({ message: "Server error", error: error.message });
  }
};