const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config();

async function run() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imagePath = "WhatsApp Unknown 2026-09-26 at 10.14.19 PM/WhatsApp Image 2026-09-26 at 10.14.08 PM.jpeg";
    const imagePart = {
        inlineData: {
            data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
            mimeType: "image/jpeg"
        }
    };

    const prompt = `You are an expert content extractor. Extract the question and answers from the image. Also, determine the topic of the question (e.g., "folk dances", "festivals", "books authors", "sports", etc.). 
Return ONLY JSON with this format:
{
  "topic": "topic_name",
  "question": "Question text...",
  "options": {
    "A": "Option 1",
    "B": "Option 2",
    "C": "Option 3",
    "D": "Option 4"
  },
  "correct": "Correct option letter if visible, otherwise null",
  "explanation": "Explanation text if visible, otherwise null"
}`;

    try {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch (e) {
        console.error(e);
    }
}
run();
