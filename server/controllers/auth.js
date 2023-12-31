import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("All fields are required");
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    if (error.message.includes("duplicate key error"))
      res.status(400).json({ error: "Username already exists" });
    else res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user || user.password !== password)
      throw new Error("Invalid Credentials !");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
