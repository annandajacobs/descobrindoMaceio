import api from "./api";

export const getFavoritos = (userId) => api.get(`/favoritos/${userId}`);
export const addFavorito = (userId, localId) =>
  api.post("/favoritos", { userId, localId });
export const removeFavorito = (favId) => api.delete(`/favoritos/${favId}`);
