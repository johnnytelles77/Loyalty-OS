'use client';

import React, { useState } from 'react';
import ToastAlert from './ToastAlert';
import { promotionApi, Promotion } from '../api/promotionApi';
import { userApi } from '../api/userApi';

import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface Props {
  open: boolean;
  promotion: Promotion | null;
  onClose: () => void;
}

export default function RedeemPromotionModal({ open, promotion, onClose }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!open || !promotion) return null;

  const handleRedeem = async () => {
    setToast(null);

    if (!phone.trim()) {
      setToast({ type: 'error', message: 'Ingresa un teléfono' });
      return;
    }

    setLoading(true);
    try {
      // 1) Buscar cliente por teléfono
      const userResp = await userApi.getUserByTelefono(phone.trim());
      const userId = userResp.data?.id;

      if (!userId) {
        setToast({ type: 'error', message: 'Cliente no encontrado' });
        return;
      }

      // 2) Redimir promo
      const message = await promotionApi.redeemPromotion(userId, promotion.id);

      setToast({ type: 'success', message: message || 'Promoción redimida' });
      setPhone('');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Error al redimir promoción';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg">
        <Card className="p-6 relative">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">Redimir promoción</h3>
            <p className="text-gray-600 text-sm">
              Promoción:{' '}
              <span className="font-semibold text-gray-900">{promotion.title}</span>{' '}
              <span className="text-gray-500">({promotion.pointsRequired} pts)</span>
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Teléfono del cliente</label>
              <Input
                placeholder="Ej: 9195551234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
                className="w-auto"
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={handleRedeem}
                disabled={loading}
                className="w-auto"
              >
                {loading ? 'Redimiendo...' : 'Redimir'}
              </Button>
            </div>
          </div>

          {toast && (
            <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />
          )}
        </Card>
      </div>
    </div>
  );
}