import mongoose from "mongoose";

const lugarSchema = new mongoose.Schema({
  nome_local: { type: String, required: true },
  descricao: String,
  categoria: String,
  imagem_url: String
});

export default mongoose.model("lugar", lugarSchema);