import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function motivatorAI(message) {
  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "Kamu adalah AI motivator yang suportif, membangkitkan semangat, memberi harapan, dan fokus ke masa depan secara realistis."
      },
      { role: "user", content: message }
    ]
  });

  return completion.choices[0].message.content;
}
