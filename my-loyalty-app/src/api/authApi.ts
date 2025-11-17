import api from './axios';
import { BusinessDTO } from '../types/BusinessDTO';

export const authApi = {
  registerBusiness: async (data: BusinessDTO) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al registrar negocio');
    }
  },

 login: async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { token, business } según tu backend
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
},

  getProfile: async (token?: string) => {
    try {
      const t = token || localStorage.getItem('token');
      if (!t) throw new Error('No token found');

      const response = await api.get('/api/businesses/me', {
        headers: { Authorization: `Bearer ${t}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  },
};