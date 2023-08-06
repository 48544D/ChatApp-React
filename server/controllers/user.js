import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error("User does not exist");
    res.status(200).json(user);
  } catch (error) {
    if (error.message === "User does not exist")
      res.status(404).json({ error: "User does not exist" });
    else res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw new Error("No users found");
    res.status(200).json(users);
  } catch (error) {
    if (error.message === "No users found")
      res.status(404).json({ error: "No users found" });
    else res.status(500).json({ error: error.message });
  }
};
