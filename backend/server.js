import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
