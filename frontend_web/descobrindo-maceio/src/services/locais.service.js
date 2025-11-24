import api from "./axios";

export const getLocais = () => api.get("/api/lugares");
export const getLocalById = (id) => api.get(`/api/lugares/${id}`);

// Alterar rotas se necessário