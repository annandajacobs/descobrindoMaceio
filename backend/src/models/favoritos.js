import mongoose from "mongoose";

const FavoritosSchema = new mongoose.Schema(
  {
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true, // cada usuário terá somente um documento de favoritos
    },

    categorias: {
      Praias: {
        type: [String], // lista de IDs de locais
        default: [],
      },
      "Passeios Culturais": {
        type: [String],
        default: [],
      },
      Lazer: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Favoritos", FavoritosSchema, "favoritos");
