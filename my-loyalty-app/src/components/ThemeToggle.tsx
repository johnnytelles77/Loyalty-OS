'use client';

import React from 'react';
import { useTheme } from '../utils/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Evita “flash”/hydration mismatch
  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:bg-[var(--primary-soft)] transition flex items-center justify-center"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
    >
      <span className="text-lg">{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
}