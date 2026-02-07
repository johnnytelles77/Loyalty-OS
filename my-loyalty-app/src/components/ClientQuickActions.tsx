'use client';

import React, { useState } from 'react';
import { ClientDTO } from '../types/ClientDTO';
import { clientApi } from '../api/clientApi';
import { useAuth } from '../context/AuthContext';

interface Props {
  client: ClientDTO;
  onClientUpdate?: (client: ClientDTO) => void;
}

export default function ClientQuickActions({ client, onClientUpdate }: Props) {
  const { token } = useAuth();

  const [localClient, setLocalClient] = useState<ClientDTO>(client);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'redeem' | null>(null);
  const [points, setPoints] = useState(0);

  const openModal = (type: 'add' | 'redeem') => {
    setModalType(type);
    setPoints(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setPoints(0);
  };

  const handleConfirm = async () => {
    if (!token || points <= 0 || !modalType) return;

    try {
      let updated: ClientDTO | null = null;

      if (modalType === 'add') {
        updated = await clientApi.addPoints(Number(localClient.id), points, token);
      } else {
        updated = await clientApi.redeemPoints(localClient.id, points, token);
      }

      if (updated) {
        setLocalClient(updated);
        onClientUpdate?.(updated);
      }
    } catch (err: any) {
      console.error(err?.message || err);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-[var(--text-primary)]">Cliente encontrado</h4>

          <div className="mt-3 space-y-1 text-sm">
            <p className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-medium">Nombre:</span> {localClient.nombre}
            </p>
            <p className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-medium">Teléfono:</span> {localClient.telefono}
            </p>
            <p className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-medium">Puntos:</span>{' '}
              <span className="font-semibold text-[var(--text-primary)]">{localClient.puntos}</span>
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--border-default)]">
          Quick actions
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium tap-target bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
          onClick={() => openModal('add')}
        >
          ➕ Agregar puntos
        </button>

        <button
          className="px-4 py-2 rounded-xl text-sm font-medium tap-target border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
          onClick={() => openModal('redeem')}
        >
          🎁 Redimir
        </button>

        <button
          className="px-4 py-2 rounded-xl text-sm font-medium tap-target border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
          type="button"
        >
          ✏️ Editar
        </button>
      </div>

      {/* Modal */}
      {showModal && modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {modalType === 'add' ? 'Agregar puntos' : 'Redimir puntos'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Ajusta la cantidad y confirma.
            </p>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                className="h-11 w-11 rounded-xl border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
                onClick={() => setPoints(Math.max(points - 1, 0))}
              >
                –
              </button>

              <div className="min-w-[64px] text-center text-2xl font-bold text-[var(--text-primary)]">
                {points}
              </div>

              <button
                className="h-11 w-11 rounded-xl border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
                onClick={() => setPoints(points + 1)}
              >
                +
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition disabled:opacity-60"
                onClick={handleConfirm}
                disabled={points <= 0}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}