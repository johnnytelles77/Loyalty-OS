'use client';

import React, { useState } from 'react';
import ToastAlert from './ToastAlert';
import { promotionApi, CreatePromotionPayload } from '../api/promotionApi';

import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void; // refrescar lista
}

export default function CreatePromotionModal({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState<CreatePromotionPayload>({
    title: '',
    description: '',
    pointsRequired: 10,
    startDate: '',
    endDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if (!form.title.trim() || !form.description.trim() || !form.pointsRequired) {
      setToast({ type: 'error', message: 'Completa título, descripción y puntos requeridos' });
      return;
    }

    setLoading(true);
    try {
      await promotionApi.createPromotion({
        title: form.title,
        description: form.description,
        pointsRequired: Number(form.pointsRequired),
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      });

      setToast({ type: 'success', message: 'Promoción creada' });

      setForm({
        title: '',
        description: '',
        pointsRequired: 10,
        startDate: '',
        endDate: '',
      });

      onCreated?.();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error al crear promoción';
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
            <h3 className="text-xl font-bold text-gray-900">Crear promoción</h3>
            <p className="text-gray-600 text-sm">
              Define una recompensa para que tus clientes puedan redimir puntos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Puntos requeridos"
              value={String(form.pointsRequired ?? '')}
              onChange={(e) => setForm({ ...form, pointsRequired: Number(e.target.value) })}
            />

            <Input
              placeholder="Descripción"
              className="md:col-span-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Inicio</label>
              <Input
                type="datetime-local"
                value={(form.startDate as string) || ''}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Fin</label>
              <Input
                type="datetime-local"
                value={(form.endDate as string) || ''}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
                className="w-auto"
              >
                Cancelar
              </Button>

              <Button type="submit" variant="primary" disabled={loading} className="w-auto">
                {loading ? 'Creando...' : 'Crear'}
              </Button>
            </div>
          </form>

          {toast && (
            <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />
          )}
        </Card>
      </div>
    </div>
  );
}