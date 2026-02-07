'use client';

import React, { useState } from 'react';
import { ClientDTO } from '../types/ClientDTO';
import { clientApi } from '../api/clientApi';
import ClientQuickActions from './ClientQuickActions';
import { useAuth } from '../context/AuthContext';

export default function ClientSearch() {
  const { token } = useAuth();

  const [phone, setPhone] = useState('');
  const [client, setClient] = useState<ClientDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!token || !phone.trim()) return;

    setLoading(true);
    setError(null);
    setClient(null);

    try {
      const found = await clientApi.searchByPhone(phone.trim(), token);
      setClient(found);
    } catch {
      setError('Cliente no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">Buscar cliente</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Busca por teléfono para agregar o redimir puntos.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--border-default)]">
          Tablet ready
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
        />

        <button
          onClick={handleSearch}
          className="px-5 py-3 rounded-xl text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition disabled:opacity-60"
          disabled={loading || !phone.trim()}
        >
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-[var(--error)]">{error}</p>}

      {client && <ClientQuickActions client={client} onClientUpdate={setClient} />}
    </div>
  );
}