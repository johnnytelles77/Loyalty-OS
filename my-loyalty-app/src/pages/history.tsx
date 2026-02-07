"use client";

import React, { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import ToastAlert from "../components/ToastAlert";

import Card from "../components/ui/Card";

type Tipo = "ADD_POINTS" | "REDEEM";

interface HistoryItem {
  cantidad: number;
  tipo: string;
  fecha: string;
  userId: number;
  telefono?: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [tipo, setTipo] = useState<Tipo>("ADD_POINTS");

  const fetchHistory = async (selectedTipo: Tipo) => {
    setLoading(true);
    setToast(null);

    try {
      const res = await userApi.getHistory(0, 25, selectedTipo);
      const data = res.data?.content ?? [];
      setHistory(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al cargar historial";
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(tipo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  const badgeClass = (t: string) => {
    if (t === "REDEEM") return "bg-[rgba(109,76,255,0.14)] text-[var(--text-primary)] border border-[rgba(109,76,255,0.25)]";
    if (t === "ADD_POINTS") return "bg-[rgba(34,197,94,0.14)] text-[var(--text-primary)] border border-[rgba(34,197,94,0.25)]";
    return "bg-[var(--bg-card-2)] text-[var(--text-secondary)] border border-[var(--border-default)]";
  };

  const chipClass = (active: boolean) =>
    [
      "px-4 py-2 rounded-xl text-sm font-medium transition tap-target border",
      active
        ? "bg-[var(--primary)] text-white border-[rgba(0,0,0,0)]"
        : "bg-[var(--bg-card-2)] text-[var(--text-primary)] border-[var(--border-default)] hover:opacity-90",
    ].join(" ");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Historial de puntos</h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Revisa movimientos por tipo y fecha.</p>
          </div>

          {/* Chips */}
          <div className="flex gap-2">
            <button className={chipClass(tipo === "ADD_POINTS")} onClick={() => setTipo("ADD_POINTS")}>
              ADD
            </button>
            <button className={chipClass(tipo === "REDEEM")} onClick={() => setTipo("REDEEM")}>
              REDEEM
            </button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        {loading ? (
          <p className="text-[var(--text-secondary)]">Cargando...</p>
        ) : history.length === 0 ? (
          <div className="bg-[var(--bg-card-2)] border border-[var(--border-default)] p-6 rounded-2xl">
            <h3 className="font-semibold text-[var(--text-primary)]">Sin historial</h3>
            <p className="text-[var(--text-secondary)] mt-1">No hay movimientos para este filtro todavía.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--border-default)] rounded-2xl">
            <table className="min-w-full text-sm">
              <thead className="bg-[var(--bg-card-2)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Cliente</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Puntos</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Tipo</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border-t border-[var(--border-default)] hover:bg-[rgba(0,0,0,0.02)] transition">
                    <td className="px-4 py-3 text-[var(--text-primary)]">{item.telefono || item.userId}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{item.cantidad}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-3 py-1 rounded-full ${badgeClass(item.tipo)}`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {new Date(item.fecha).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </Card>
    </div>
  );
}