import Chat from "../models/chat.js";
import UserChats from "../models/userChats.js";

// CREATE A NEW CHAT
export const createChat = async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // Create new chat instance
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // Check if UserChats exists for this user
    const userChats = await UserChats.find({ userId: userId });

    // If doesn't exist, create a new one and add the chat
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // If exists, push the chat to the existing array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }

    res.status(201).send(savedChat._id);
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(500).send("Error creating chat!");
  }
};

// GET ALL USER CHATS
export const getUserChats = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });

    if (!userChats.length) {
      // Return an empty array if no userChats document exists
      return res.status(200).send([]);
    }

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.error("Error fetching userchats:", err);
    res.status(500).send("Error fetching userchats!");
  }
};

// GET SPECIFIC CHAT BY ID
export const getChatById = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    if (!chat) {
      return res.status(404).send("Chat not found!");
    }

    res.status(200).send(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).send("Error fetching chat!");
  }
};

// UPDATE CHAT WITH NEW CONVERSATION
export const updateChat = async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );

    if (updatedChat.matchedCount === 0) {
      return res.status(404).send("Chat not found!");
    }

    res.status(200).send(updatedChat);
  } catch (err) {
    console.error("Error adding conversation:", err);
    res.status(500).send("Error adding conversation!");
  }
};