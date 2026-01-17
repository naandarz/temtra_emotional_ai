import express from "express";
import { coreAI } from "../ai/coreAI.js";
import { calmingAI } from "../ai/calmingAI.js";
import { listenerAI } from "../ai/listenerAI.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, mode } = req.body;

  try {
    // =============================
    // MODE MANUAL (AI SPESIALIS)
    // =============================
    if (mode && mode !== "core") {
      let reply;

      if (mode === "calming") {
        reply = await calmingAI(message);
      } else if (mode === "listener") {
        reply = await listenerAI(message);
      } else {
        reply = "Mode AI tidak dikenal.";
      }

      return res.json({ reply });
    }

    // =============================
    // MODE CORE (AUTO ANALYSIS)
    // =============================
    const raw = await coreAI(message);

    // DEBUG (boleh dihapus nanti)
    console.log("RAW AI OUTPUT:\n", raw);

    let parsed;

    try {
      const jsonStart = raw.indexOf("{");
      const jsonEnd = raw.lastIndexOf("}") + 1;
      const safeJson = raw.substring(jsonStart, jsonEnd);
      parsed = JSON.parse(safeJson);
    } catch (err) {
      // FALLBACK: chat tetap jalan
      return res.json({
        reply: raw,
        recommendedAI: "core"
      });
    }

    return res.json({
      reply: parsed.response,
      emotion: parsed.emotion,
      intensity: parsed.intensity,
      recommendedAI: parsed.recommended_ai
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({
      reply: "Maaf, aku sedang kesulitan merespons. Coba lagi sebentar ya."
    });
  }
});

export default router;
