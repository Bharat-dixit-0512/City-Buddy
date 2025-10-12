import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../model/usermodel.js";

// Resolve the directory of this module to build a safe file path on all platforms
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "_data");
const USERS_FILE = path.join(DATA_PATH, "users.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_PATH, { recursive: true });
    // ensure users.json exists
    try {
      await fs.access(USERS_FILE);
    } catch (err) {
      // create empty array file
      await fs.writeFile(USERS_FILE, "[]", "utf8");
    }
  } catch (err) {
    // ignore
  }
}

async function readUsersFile() {
  try {
    await ensureDataDir();
    const content = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
}

async function writeUsersFile(users) {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export const findOne = async (filter) => {
  // Use Mongoose when connected
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return User.findOne(filter).lean();
  }

  // Fallback to file
  const users = await readUsersFile();
  const keys = Object.keys(filter);
  return users.find((u) => keys.every((k) => u[k] === filter[k]));
};

export const create = async (userData) => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    const user = new User(userData);
    const saved = await user.save();
    return { user: saved, usingFallback: false };
  }

  // File fallback: enforce unique email
  const users = await readUsersFile();
  if (users.some((u) => u.email === userData.email)) {
    const err = new Error("User already exists");
    err.code = "DUPLICATE_EMAIL";
    throw err;
  }

  // simple unique id
  const id = Date.now().toString();
  const newUser = { _id: id, ...userData };
  users.push(newUser);
  await writeUsersFile(users);
  return { user: newUser, usingFallback: true };
};
