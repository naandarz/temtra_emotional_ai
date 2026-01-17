import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function calmingAI(userInput) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are a calming emotional support AI.
Guide breathing, grounding, and relaxation.
Speak slowly, warmly, and gently in Indonesian.
Do NOT diagnose.
`
      },
      {
        role: "user",
        content: userInput
      }
    ],
    temperature: 0.5
  });

  return completion.choices[0].message.content;
}
