import api from './axios';

export type Promotion = {
  id: number;
  title: string;
  description: string;
  pointsRequired: number;
  startDate: string | null;
  endDate: string | null;
  businessId: number | null;
};

export type CreatePromotionPayload = {
  title: string;
  description: string;
  pointsRequired: number;
  startDate?: string;
  endDate?: string;
};

export const promotionApi = {
  getMyPromotions: async () => {
    const res = await api.get<Promotion[]>('/api/promotions/business/my');
    return res.data;
  },

  createPromotion: async (payload: CreatePromotionPayload) => {
    const res = await api.post<Promotion>('/api/promotions', payload);
    return res.data;
  },

  redeemPromotion: async (userId: number, promotionId: number) => {
    const res = await api.post<string>(`/api/promotions/redeem?userId=${userId}&promotionId=${promotionId}`);
    return res.data;
  },
};