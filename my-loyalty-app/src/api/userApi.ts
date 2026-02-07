import api from './axios';
import { UserDTO } from '../types/UserDTO';
import { BusinessDTO } from '../types/BusinessDTO';

export const userApi = {
  addPoints: async (userId: number, puntos: number) => {
    return api.put(`/api/users/${userId}/add-points/${puntos}`);
  },

  getUserByTelefono: async (telefono: string) => {
    return api.get<UserDTO>(`/api/users/telefono/${telefono}`);
  },

  getHistory: async (page = 0, size = 15, tipo?: string) => {
    const params: any = { page, size };
    if (tipo) params.tipo = tipo;

    return api.get('/api/points/history/business', { params });
  },

  getBusiness: async () => {
    return api.get<BusinessDTO>('/api/businesses/me');
  },
};