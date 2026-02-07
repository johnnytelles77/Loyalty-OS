"use client";

import React from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

export type Client = {
  id: number;
  nombre: string;
  telefono: string;
  email?: string;
  puntos: number;
  businessId?: number | null;
};

export default function ClientProfile({
  client,
  onBack,
}: {
  client: Client;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Perfil del cliente
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Información y acciones rápidas.
          </p>
        </div>

        <Button variant="secondary" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <div className="space-y-2">
              <div className="text-sm text-[var(--text-secondary)]">Cliente</div>
              <div className="text-lg font-semibold text-[var(--text-primary)]">
                {client.nombre}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-[var(--text-secondary)]">Teléfono</span>
                <span className="text-right text-[var(--text-primary)] font-medium">
                  {client.telefono}
                </span>

                <span className="text-[var(--text-secondary)]">Email</span>
                <span className="text-right text-[var(--text-primary)] font-medium">
                  {client.email || "—"}
                </span>

                <span className="text-[var(--text-secondary)]">Puntos</span>
                <span className="text-right text-[var(--text-primary)] font-bold">
                  {client.puntos}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Acciones rápidas
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <Button variant="primary">➕ Agregar puntos</Button>
              <Button variant="secondary">🎁 Redimir puntos</Button>
              <Button variant="secondary">🏷️ Redimir promoción</Button>
            </div>

            <div className="mt-3 text-xs text-[var(--text-secondary)]">
              (En el siguiente ticket conectamos estas acciones a modales reales)
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[var(--text-secondary)]">
                  Resumen
                </div>
                <div className="text-base font-semibold text-[var(--text-primary)]">
                  Estado del cliente
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--text-primary)]">
                Activo
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                <div className="text-xs text-[var(--text-secondary)]">Puntos actuales</div>
                <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                  {client.puntos}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                <div className="text-xs text-[var(--text-secondary)]">Redimidos (mes)</div>
                <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">—</div>
              </div>

              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                <div className="text-xs text-[var(--text-secondary)]">Movimientos</div>
                <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">—</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Historial reciente
            </div>
            <div className="mt-3 text-sm text-[var(--text-secondary)]">
              (Siguiente ticket: traer historial real del cliente desde backend)
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}