import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar Mongo:", err));

app.use("/api", routes);

export default app;
