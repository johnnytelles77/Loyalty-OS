'use client';
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { business, logout, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // ⚡ Redirige a login si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !business) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Bienvenido, {business.nombre}</h1>
        <button
          onClick={() => {
            logout();
            router.replace('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <h1 className="text-5xl font-extrabold">LOYALTY OS</h1>
    </div>
  );
}