'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import AuthLayout from '../components/layouts/AuthLayout';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your clients, points and promotions."
      bottomLink={{ text: 'No account?', href: '/register-business', label: 'Create one' }}
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)]">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--text-primary)]">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] text-white py-2.5 text-sm font-semibold hover:bg-[var(--primary-hover)] transition disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
}