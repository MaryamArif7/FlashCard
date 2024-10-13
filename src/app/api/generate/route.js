import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topics or content. Follow the rules:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both the questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcard.
10. Aim to create a balanced set of flashcards that cover the topic comprehensively.
11. Only Generate 10 FlashCards
{
  "flashcards":[
    {
      "front": "term or concept",
      "back": "short explanation or definition"
    }
  ]
}`;

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = await req.text();
    const completion = await model.generateContent([systemPrompt, ...data]);

    let content =
      completion.response.candidates[0].content.parts[0].text.trim();
    content = content.replace(/```json/g, "").replace(/```/g, "");

    const flashcards = JSON.parse(content);

    return NextResponse.json(flashcards.flashcards);
  } catch (e) {
    console.error("Error generating flashcards:", e.message, e.stack);
    return NextResponse.json([
      {
        front: "No flashcard generated",
        back: "Please try a different topic.",
      },
    ]);
  }
}