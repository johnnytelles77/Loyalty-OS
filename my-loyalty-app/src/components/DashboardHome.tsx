"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { dashboardApi, DashboardMetrics } from "../api/dashboardApi";

export default function DashboardHome() {
  const { business } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await dashboardApi.getMetrics();
        setMetrics(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-default)] shadow-soft">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
          Bienvenido{business?.nombre ? `, ${business.nombre}` : ""}
        </h1>

        <p className="text-[var(--text-secondary)] mt-2 max-w-2xl">
          Administra tu programa de lealtad: busca clientes, agrega puntos, revisa historial y redime recompensas.
        </p>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Clientes" value={metrics ? String(metrics.totalClients) : "—"} subtitle="Registrados" />
        <StatCard title="Puntos" value={metrics ? String(metrics.netPoints) : "—"} subtitle="Netos (Earn - Redeem)" />
        <StatCard title="Promociones" value={metrics ? String(metrics.activePromotions) : "—"} subtitle="Activas" />
      </section>

      {/* Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Agregar puntos"
          description="Encuentra un cliente por teléfono y registra puntos rápidamente."
          badge="Operación rápida"
        />
        <ActionCard
          title="Historial"
          description="Consulta movimientos por fecha y filtra por tipo (ADD / REDEEM)."
          badge="Auditoría"
        />
        <ActionCard
          title="Clientes"
          description="Administra tu lista: crear, editar y eliminar clientes."
          badge="Gestión"
        />
        <ActionCard
          title="Promociones"
          description="Crea promociones y permite redimirlas con puntos."
          badge="Growth"
        />
      </section>

      {/* Tip */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-default)] p-6 rounded-2xl shadow-soft">
        <h3 className="font-semibold text-[var(--text-primary)]">Tip</h3>
        <p className="text-[var(--text-secondary)] mt-1">
          Usa “Historial” para validar movimientos y detectar errores antes de cerrar el día.
        </p>
      </section>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-default)] shadow-soft">
      <p className="text-sm text-[var(--text-secondary)]">{title}</p>
      <p className="text-3xl font-bold text-[var(--text-primary)] mt-2">{value}</p>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-default)] shadow-soft hover:opacity-[0.98] transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
          <p className="text-[var(--text-secondary)] mt-2">{description}</p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-card-2)] border border-[var(--border-default)] text-[var(--text-secondary)] whitespace-nowrap">
          {badge}
        </span>
      </div>
    </div>
  );
}