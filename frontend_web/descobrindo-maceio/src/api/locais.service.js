import api from "./axios";

export const getLocais = () => api.get("/locais");
export const getLocalById = (id) => api.get(`/locais/${id}`);

// Alterar rotas se necessário