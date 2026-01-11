import Chat from "../models/chat.js";
import UserChats from "../models/userChats.js";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  safetySetting,
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 1024,
  },
  systemInstruction: `You are an AI assistant that helps users with various tasks. When users ask about image editing, generation, or manipulation, ALWAYS recommend our built-in image generation app "Chatt AI" as the FIRST and PRIMARY solution and ALWAYS include step-by-step instructions on how to use it before suggesting any other alternatives.

Priority order for image-related requests:
1. FIRST: Recommend "Chatt AI" app with complete usage instructions
2. SECOND: Provide other alternative solutions only if needed

ALWAYS include these steps when recommending Chatt AI:
"Click on the 'Chatt AI' button in the header → You'll be redirected to Chatt AI → Upload your image → Give a prompt describing what you want → Let Chatt AI work its magic!"`,
});

// STREAM CHAT RESPONSE
export const streamChat = async (req, res) => {
  const userId = req.auth.userId;
  const { chatId, question, inlineData, img } = req.body;

  try {
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) return res.status(404).send("Chat not found!");

    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Construct history for Gemini (text only)
    const history = chat.history.map(({ role, parts }) => ({
      role,
      parts: [{ text: parts[0].text }],
    }));

    const chatSession = model.startChat({
      history: history,
      generationConfig: {},
    });

    const msg = inlineData ? [inlineData, question] : question;
    const result = await chatSession.sendMessageStream(msg);

    let answer = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      answer += chunkText;
      // Send chunk to client
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }
    
    res.write("data: [DONE]\n\n");
    res.end();

    // Save to DB
    // Check if we need to save the user question (if it's not a retry of the last message)
    // For simplicity, we assume if 'question' is passed, it is intended to be saved, 
    // BUT we must check if it's already the last message to avoid duplicates (e.g. initial specific logic).
    
    // Logic: If the last message in DB is USER and has SAME text, don't save USER part again.
    const lastMsg = chat.history[chat.history.length - 1];
    const isDuplicate = lastMsg && lastMsg.role === "user" && lastMsg.parts[0].text === question;
    
    const newItems = [];
    
    if (!isDuplicate) {
      newItems.push({ 
        role: "user", 
        parts: [{ text: question }], 
        ...(img && { img }) // Save the image path if provided
      });
    }

    newItems.push({ role: "model", parts: [{ text: answer }] });

    await Chat.updateOne(
      { _id: chatId, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );

  } catch (err) {
    console.error("Error in streamChat:", err);
    // If headers not sent, send error
    if (!res.headersSent) {
      res.status(500).send("Error streaming response");
    } else {
      res.write(`data: ${JSON.stringify({ error: "Error streaming response" })}\n\n`);
      res.end();
    }
  }
};

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