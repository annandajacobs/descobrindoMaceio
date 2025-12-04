import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  async login(email, senha) {
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao fazer login' };
    }
  },

  async register(nome, email, senha) {
    try {
      const response = await api.post('/usuarios', { nome, email, senha });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao criar conta' };
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar usuário' };
    }
  },

  async updateUser(id, data) {
    try {
      const response = await api.put(`/usuarios/${id}`, data);
      
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.id === id) {
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...data }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar usuário' };
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao deletar usuário' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;