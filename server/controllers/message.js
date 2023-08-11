import Message from "../models/message.js";

// create a new message
export const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const newMessage = new Message({
      chatId,
      senderId,
      text,
    });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all messages of a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId: chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
