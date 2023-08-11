import Chat from "../models/chat.js";

// create a new chat
export const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    const isChat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (isChat) return res.status(400).json({ message: "Chat already exists" });
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
    const { userId } = req.body;
    const chats = await Chat.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a chat by id
export const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
