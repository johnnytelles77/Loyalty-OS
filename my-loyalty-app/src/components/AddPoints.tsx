"use client";

import React, { useState } from "react";
import { userApi } from "../api/userApi";
import ToastAlert from "./ToastAlert";

import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function AddPoints() {
  const [telefono, setTelefono] = useState("");
  const [puntos, setPuntos] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleAddPoints = async () => {
    if (!telefono.trim() || puntos <= 0) {
      setToast({ type: "error", message: "Ingresa teléfono y puntos válidos" });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const userResp = await userApi.getUserByTelefono(telefono.trim());
      const userId = userResp.data?.id;

      if (!userId) throw new Error("Usuario no encontrado");

      await userApi.addPoints(userId, puntos);

      setToast({ type: "success", message: "Puntos agregados correctamente" });
      setTelefono("");
      setPuntos(0);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al agregar puntos";
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Agregar puntos a cliente</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Busca por teléfono y asigna puntos en segundos.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Input
          type="text"
          placeholder="Teléfono del cliente"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Cantidad de puntos"
          value={puntos}
          onChange={(e) => setPuntos(Number(e.target.value))}
        />

        <Button onClick={handleAddPoints} disabled={loading} variant="primary">
          {loading ? "Agregando..." : "Agregar puntos"}
        </Button>
      </div>

      {toast && <ToastAlert type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </Card>
  );
}