import Chat from "../models/chat.js";

// create a new chat
export const createChat = async (req, res) => {
  try {
    const firstId = req.userId;
    const { secondId } = req.body;
    if (firstId === secondId)
      throw new Error("You cannot create a chat with yourself");
    const isChat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (isChat) throw new Error("Chat already exists");
    const newChat = new Chat({
      members: [firstId, secondId],
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all chats of a user
export const getChats = async (req, res) => {
  try {
    const userId = req.userId;
    const chats = await Chat.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a chat by id
export const getChat = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const chat = await Chat.findById(id);
    // checking if user is a member of the chat
    if (!chat.members.includes(userId))
      return res.status(401).json({ message: "Unauthorized" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
