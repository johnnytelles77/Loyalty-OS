/*import React from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  const { business, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Por favor, inicia sesión</h1>
        <Link href="/login">
          <button className="bg-black text-white px-4 py-2 rounded">Iniciar Sesión</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Bienvenido, {business.nombre}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
      <h1 className="text-5xl font-extrabold">LOYALTY OS</h1>
    </div>
  );
} */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [loading, isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold">Cargando...</h1>
    </div>
  );
}