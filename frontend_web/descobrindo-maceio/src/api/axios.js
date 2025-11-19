import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
}); // Alterar a porta se necessário 

export default api;
