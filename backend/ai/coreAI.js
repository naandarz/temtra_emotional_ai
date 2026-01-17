import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function coreAI(userInput) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are an empathetic psychological support AI.

TASK:
- Analyze user's emotional condition
- Give empathetic response
- Recommend the most suitable AI

OUTPUT RULES (VERY IMPORTANT):
- Return ONLY raw JSON
- NO explanation
- NO markdown
- JSON must start with { and end with }

JSON FORMAT:
{
  "emotion": "string",
  "intensity": "low | medium | high",
  "response": "empathetic message in Indonesian",
  "recommended_ai": "core | calming | listener"
}

CONSTRAINTS:
- Do NOT diagnose
- Do NOT mention medical terms
- Use warm Indonesian language
`
      },
      {
        role: "user",
        content: userInput
      }
    ],
    temperature: 0.4
  });

  return completion.choices[0].message.content;
}
