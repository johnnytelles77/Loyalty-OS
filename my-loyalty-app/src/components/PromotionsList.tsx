"use client";

import React, { useEffect, useState } from "react";
import ToastAlert from "./ToastAlert";
import { promotionApi, Promotion } from "../api/promotionApi";
import CreatePromotionModal from "./CreatePromotionModal";
import RedeemPromotionModal from "./RedeemPromotionModal";

import Card from "./ui/Card";
import Button from "./ui/Button";

type PromoStatus = "ACTIVE" | "EXPIRED" | "NO_END_DATE";

function getPromotionStatus(p: { endDate: string | null }): PromoStatus {
  if (!p.endDate) return "NO_END_DATE";
  const end = new Date(p.endDate);
  const now = new Date();
  return end.getTime() < now.getTime() ? "EXPIRED" : "ACTIVE";
}

function statusLabel(status: PromoStatus) {
  if (status === "ACTIVE") return "Activa";
  if (status === "EXPIRED") return "Expirada";
  return "Sin fin";
}

/**
 * Token-friendly badges (works on light & dark)
 */
function statusClass(status: PromoStatus) {
  if (status === "ACTIVE")
    return "bg-[rgba(34,197,94,0.14)] text-[var(--text-primary)] border border-[rgba(34,197,94,0.28)]";
  if (status === "EXPIRED")
    return "bg-[rgba(239,68,68,0.14)] text-[var(--text-primary)] border border-[rgba(239,68,68,0.28)]";
  return "bg-[var(--bg-card-2)] text-[var(--text-secondary)] border border-[var(--border-default)]";
}

export default function PromotionsList() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Create Modal
  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Redeem Modal
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const load = async () => {
    setLoading(true);
    setToast(null);

    try {
      const data = await promotionApi.getMyPromotions();

      // ✅ UX: ordenar activas primero, luego sin fin, luego expirada
      const rank = (s: PromoStatus) => (s === "ACTIVE" ? 0 : s === "NO_END_DATE" ? 1 : 2);
      const sorted = [...data].sort((a, b) => {
        const sa = getPromotionStatus(a);
        const sb = getPromotionStatus(b);
        return rank(sa) - rank(sb);
      });

      setItems(sorted);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al cargar promociones";
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Promociones</h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Administra promociones para que tus clientes rediman puntos.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setOpenCreateModal(true)}>
              ➕ Crear promoción
            </Button>

            <Button variant="secondary" onClick={load} disabled={loading}>
              {loading ? "Cargando..." : "Refrescar"}
            </Button>
          </div>
        </div>
      </Card>

      {/* LISTA */}
      <Card>
        {loading ? (
          <p className="text-[var(--text-secondary)]">Cargando promociones...</p>
        ) : items.length === 0 ? (
          <div className="bg-[var(--bg-card-2)] border border-[var(--border-default)] p-6 rounded-2xl">
            <h3 className="font-semibold text-[var(--text-primary)]">Aún no tienes promociones</h3>
            <p className="text-[var(--text-secondary)] mt-1">
              Crea una promoción para que tus clientes puedan redimir puntos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--border-default)] rounded-2xl">
            <table className="min-w-full text-sm">
              <thead className="bg-[var(--bg-card-2)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Título</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Descripción</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Puntos</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Inicio</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Fin</th>
                  <th className="px-4 py-3 text-left text-[var(--text-secondary)] font-medium">Estado</th>
                  <th className="px-4 py-3 text-right text-[var(--text-secondary)] font-medium">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {items.map((p) => {
                  const st = getPromotionStatus(p);
                  const disabledRedeem = st === "EXPIRED";

                  return (
                    <tr
                      key={p.id}
                      className="border-t border-[var(--border-default)] hover:bg-[rgba(0,0,0,0.02)] transition"
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{p.title}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{p.description}</td>
                      <td className="px-4 py-3 text-[var(--text-primary)]">{p.pointsRequired}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">
                        {p.startDate ? new Date(p.startDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">
                        {p.endDate ? new Date(p.endDate).toLocaleDateString() : "—"}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full ${statusClass(st)}`}>
                          {statusLabel(st)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            className={[
                              "px-3 py-2 rounded-xl text-white text-sm font-medium transition tap-target",
                              disabledRedeem
                                ? "bg-[rgba(148,163,184,0.55)] cursor-not-allowed"
                                : "bg-[var(--primary)] hover:bg-[var(--primary-hover)]",
                            ].join(" ")}
                            disabled={disabledRedeem}
                            title={disabledRedeem ? "Esta promoción está expirada" : "Redimir promoción"}
                            onClick={() => {
                              if (disabledRedeem) return;
                              setSelectedPromotion(p);
                              setRedeemOpen(true);
                            }}
                          >
                            🎁 Redimir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </Card>

      {/* MODAL CREAR */}
      <CreatePromotionModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreated={load}
      />

      {/* MODAL REDIMIR */}
      <RedeemPromotionModal
        open={redeemOpen}
        promotion={selectedPromotion}
        onClose={() => {
          setRedeemOpen(false);
          setSelectedPromotion(null);
        }}
      />
    </div>
  );
}