import api from './axios';

export type DashboardMetrics = {
  totalClients: number;
  netPoints: number;
  activePromotions: number;
};

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const res = await api.get<DashboardMetrics>('/api/dashboard/metrics');
    return res.data;
  },
};