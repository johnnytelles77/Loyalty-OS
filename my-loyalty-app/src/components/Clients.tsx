"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ToastAlert from "./ToastAlert";
import ClientProfile, { Client as ClientProfileType } from "./ClientProfile";

interface Client {
  id: number;
  nombre: string;
  telefono: string;
  email?: string;
  puntos: number;
  businessId: number | null;
}

export default function Clients() {
  const { token } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // ✅ Profile state
  const [viewMode, setViewMode] = useState<"table" | "profile">("table");
  const [selectedClient, setSelectedClient] =
    useState<ClientProfileType | null>(null);

  // ✅ Data
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ UI form modes
  const [activeView, setActiveView] = useState<"list" | "create">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "" });

  // ✅ Toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadClients = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar clientes");

      const data: Client[] = await res.json();
      setClients(data);
    } catch (err: any) {
      setToast({
        type: "error",
        message: err.message || "Error al cargar clientes",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const resetForm = () => {
    setForm({ nombre: "", telefono: "", email: "" });
    setEditingId(null);
  };

  const openProfile = (client: Client) => {
    setSelectedClient({
      id: client.id,
      nombre: client.nombre,
      telefono: client.telefono,
      email: client.email || "",
      puntos: client.puntos,
      businessId: client.businessId ?? null,
    });
    setViewMode("profile");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!form.nombre || !form.telefono) {
      setToast({ type: "error", message: "Debes ingresar nombre y teléfono" });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar cliente");

      await res.json();

      setToast({
        type: "success",
        message: editingId
          ? "Cliente actualizado"
          : "Cliente creado correctamente",
      });

      resetForm();
      setActiveView("list");
      loadClients();
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Error desconocido" });
    }
  };

  const handleEdit = (client: Client) => {
    setForm({
      nombre: client.nombre,
      telefono: client.telefono,
      email: client.email || "",
    });
    setEditingId(client.id);
    setActiveView("create");
  };

  const handleDelete = async (id: number) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar cliente");

      setClients((prev) => prev.filter((c) => c.id !== id));
      setToast({ type: "success", message: "Cliente eliminado" });
    } catch (err: any) {
      setToast({ type: "error", message: err.message || "Error desconocido" });
    }
  };

  // ✅ PROFILE VIEW
  if (viewMode === "profile" && selectedClient) {
    return (
      <ClientProfile
        client={selectedClient}
        onBack={() => {
          setViewMode("table");
          setSelectedClient(null);
        }}
      />
    );
  }

  // ✅ TABLE/CREATE VIEW
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-3 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] p-4">
        <h3 className="font-semibold text-[var(--text-primary)] mb-3">
          Clientes
        </h3>

        <button
          className={[
            "w-full text-left px-4 py-2 rounded-xl mb-2 tap-target transition border",
            activeView === "list"
              ? "bg-[var(--primary-soft)] border-[var(--border-default)] text-[var(--text-primary)] font-semibold"
              : "bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--primary-soft)]",
          ].join(" ")}
          onClick={() => {
            setActiveView("list");
            resetForm();
          }}
        >
          📋 Lista
        </button>

        <button
          className={[
            "w-full text-left px-4 py-2 rounded-xl tap-target transition border",
            activeView === "create"
              ? "bg-[var(--primary-soft)] border-[var(--border-default)] text-[var(--text-primary)] font-semibold"
              : "bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--primary-soft)]",
          ].join(" ")}
          onClick={() => {
            setActiveView("create");
            resetForm();
          }}
        >
          ➕ Crear cliente
        </button>
      </aside>

      {/* Main */}
      <section className="lg:col-span-9 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] p-6">
        {activeView === "create" ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {editingId ? "Editar cliente" : "Crear cliente"}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Guarda la información básica del cliente para asignar puntos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />

              <input
                className="border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                required
              />

              <input
                className="border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl p-3 outline-none focus:ring-2 focus:ring-[var(--primary-soft)] md:col-span-2"
                placeholder="Email (opcional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl text-sm font-medium tap-target bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition">
                Guardar
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-xl text-sm font-medium tap-target bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--primary-soft)] transition"
                onClick={() => {
                  resetForm();
                  setActiveView("list");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Lista de clientes
                </h2>
                <p className="text-[var(--text-secondary)] mt-1 text-sm">
                  Administra clientes y sus puntos.
                </p>
              </div>

              <button
                className="px-4 py-2 rounded-xl text-sm font-medium tap-target bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
                onClick={() => {
                  resetForm();
                  setActiveView("create");
                }}
              >
                ➕ Nuevo
              </button>
            </div>

            <div className="mt-6">
              {loading ? (
                <p className="text-[var(--text-secondary)]">Cargando...</p>
              ) : clients.length === 0 ? (
                <div className="bg-[var(--primary-soft)] border border-[var(--border-default)] rounded-2xl p-6">
                  <p className="text-[var(--text-secondary)]">
                    No hay clientes registrados.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[var(--border-default)] rounded-2xl">
                  <table className="min-w-full text-sm">
                    <thead className="bg-[var(--primary-soft)] border-b border-[var(--border-default)]">
                      <tr>
                        <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">
                          Nombre
                        </th>
                        <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">
                          Teléfono
                        </th>
                        <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">
                          Email
                        </th>
                        <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">
                          Puntos
                        </th>
                        <th className="text-right px-4 py-3 text-[var(--text-secondary)] font-medium">
                          Acciones
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {clients.map((client) => (
                        <tr
                          key={client.id}
                          className="border-b border-[var(--border-default)] hover:bg-[var(--primary-soft)] transition cursor-pointer"
                          onClick={() => openProfile(client)}
                        >
                          <td className="px-4 py-3 text-[var(--text-primary)]">
                            {client.nombre}
                          </td>
                          <td className="px-4 py-3 text-[var(--text-primary)]">
                            {client.telefono}
                          </td>
                          <td className="px-4 py-3 text-[var(--text-secondary)]">
                            {client.email || "—"}
                          </td>
                          <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                            {client.puntos}
                          </td>

                          <td className="px-4 py-3">
                            <div
                              className="flex justify-end gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="px-3 py-1.5 rounded-xl text-sm border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition"
                                onClick={() => handleEdit(client)}
                              >
                                Editar
                              </button>

                              <button
                                className="px-3 py-1.5 rounded-xl text-sm border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(239,68,68,0.12)] hover:border-[rgba(239,68,68,0.35)] transition"
                                onClick={() => handleDelete(client.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {toast && (
        <ToastAlert
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}