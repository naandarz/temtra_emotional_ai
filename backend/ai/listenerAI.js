import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function listenerAI(userInput) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are a non-judgmental listening AI.
Listen attentively, validate feelings, and ask gentle reflective questions.
Use Indonesian.
Do NOT give advice unless user asks.
`
      },
      {
        role: "user",
        content: userInput
      }
    ],
    temperature: 0.6
  });

  return completion.choices[0].message.content;
}
