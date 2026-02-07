"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ToastAlert from "../components/ToastAlert";
import { useAuth } from "../context/AuthContext";
import { promotionApi, Promotion, CreatePromotionPayload } from "../api/promotionApi";

export default function PromotionsPage() {
  const { business, logout } = useAuth();

  const [items, setItems] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState<CreatePromotionPayload>({
    title: "",
    description: "",
    pointsRequired: 10,
    startDate: "",
    endDate: "",
  });

  const load = async () => {
    setLoading(true);
    setToast(null);

    try {
      const data = await promotionApi.getMyPromotions();
      setItems(data);
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Error al cargar promociones" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    if (!form.title.trim() || !form.description.trim() || !form.pointsRequired) {
      setToast({ type: "error", message: "Completa título, descripción y puntos requeridos" });
      return;
    }

    try {
      await promotionApi.createPromotion({
        title: form.title,
        description: form.description,
        pointsRequired: Number(form.pointsRequired),
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      });

      setToast({ type: "success", message: "Promoción creada" });

      setForm({
        title: "",
        description: "",
        pointsRequired: 10,
        startDate: "",
        endDate: "",
      });

      load();
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Error al crear promoción" });
    }
  };

  const inputClass =
    "border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]";

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)]">
      <Navbar
        businessName={business?.nombre ?? ""}
        onLogout={() => {
          logout();
          window.location.href = "/login";
        }}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <section className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-default)] shadow-soft">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Promociones</h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Crea promociones para incentivar redenciones con puntos.
          </p>
        </section>

        {/* Create form */}
        <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-default)] shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Crear promoción</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Define título, puntos y vigencia.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreate} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="number"
              className={inputClass}
              placeholder="Puntos requeridos"
              value={form.pointsRequired}
              onChange={(e) => setForm({ ...form, pointsRequired: Number(e.target.value) })}
            />

            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Descripción"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              type="datetime-local"
              className={inputClass}
              value={form.startDate as string}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />

            <input
              type="datetime-local"
              className={inputClass}
              value={form.endDate as string}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />

            <button className="md:col-span-2 px-4 py-3 rounded-xl text-sm font-medium tap-target bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition">
              Crear promoción
            </button>
          </form>
        </section>

        {/* Promotions list */}
        <section className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-default)] shadow-soft">
          <div className="flex justify-between items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Mis promociones</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Lista de promociones del negocio.</p>
            </div>

            <button
              className="px-4 py-2 rounded-xl text-sm font-medium tap-target bg-[var(--bg-card-2)] border border-[var(--border-default)] text-[var(--text-primary)] hover:opacity-90 transition"
              onClick={load}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Refrescar"}
            </button>
          </div>

          <div className="mt-4">
            {loading ? (
              <p className="text-[var(--text-secondary)]">Cargando...</p>
            ) : items.length === 0 ? (
              <div className="bg-[var(--bg-card-2)] border border-[var(--border-default)] rounded-2xl p-6">
                <p className="text-[var(--text-secondary)]">No hay promociones aún.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-[var(--border-default)] rounded-2xl">
                <table className="min-w-full text-sm">
                  <thead className="bg-[var(--bg-card-2)] border-b border-[var(--border-default)]">
                    <tr>
                      <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Título</th>
                      <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Descripción</th>
                      <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Puntos</th>
                      <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => (
                      <tr key={p.id} className="border-t border-[var(--border-default)] hover:bg-[rgba(0,0,0,0.02)] transition">
                        <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{p.title}</td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">{p.description}</td>
                        <td className="px-4 py-3 text-[var(--text-primary)]">{p.pointsRequired}</td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">
                          {p.endDate ? new Date(p.endDate).toLocaleString() : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        </section>
      </main>
    </div>
  );
}