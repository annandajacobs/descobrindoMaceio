import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // conecta com o back
});
