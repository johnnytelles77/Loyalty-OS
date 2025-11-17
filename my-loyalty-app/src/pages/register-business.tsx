// src/pages/register-business.tsx
import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { authApi } from '../api/authApi';
import ToastAlert from '../components/ToastAlert';

const RegisterBusiness: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authApi.registerBusiness({
        nombre: form.name,
        email: form.email,
        password: form.password,
      });
      setToast({ type: 'success', message: 'Negocio registrado correctamente' });
      console.log('Negocio registrado:', result);
    } catch (error: any) {
      setToast({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Negocio</h2>

        <FormInput
          label="Nombre del Negocio"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ej: Paramount Cosmetics"
        />

        <FormInput
          type="email"
          label="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="correo@ejemplo.com"
        />

        <FormInput
          type="password"
          label="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="********"
        />

        <Button text="Registrar" type="submit" />
      </form>

      {toast && (
        <ToastAlert
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default RegisterBusiness;
