'use client';

import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import AuthLayout from '../components/layouts/AuthLayout';

export default function RegisterBusiness() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.registerBusiness({
        nombre: form.name,
        email: form.email,
        password: form.password,
      });
      alert('Business created. Now you can login.');
    } catch (err: any) {
      alert(err?.message || 'Error al registrar negocio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your business"
      subtitle="Start using LoyaltyOS in minutes."
      bottomLink={{ text: 'Already have an account?', href: '/login', label: 'Login' }}
    >
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)]">Business name</label>
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Paramount Cosmetics"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--text-primary)]">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@business.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--text-primary)]">Password</label>
          <input
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-soft)]"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] text-white py-2.5 text-sm font-semibold hover:bg-[var(--primary-hover)] transition disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}