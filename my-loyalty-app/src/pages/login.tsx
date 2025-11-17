'use client';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard'); // redirige automáticamente al dashboard
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">LoyaltyOS</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4"
      >
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Usuario / Email"
          required
        />
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <Button
          text={loading ? 'Iniciando...' : 'Iniciar Sesión'}
          type="submit"
          disabled={loading}
        />
      </form>

      <p className="mt-4 text-sm">
        ¿No tienes cuenta?{' '}
        <Link href="/register-business" className="text-blue-600">
          Registrarse
        </Link>
      </p>
    </div>
  );
}