'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../Logo';
import Footer from '../Footer';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bottomLink?: { text: string; href: string; label: string };
};

export default function AuthLayout({ title, subtitle, children, bottomLink }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)]">
      <header className="w-full border-b border-[var(--border-default)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={40} showText />
          </Link>

          <div className="text-sm text-[var(--text-secondary)]">
            LoyaltyOS for Restaurants
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-soft">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>

            {subtitle && (
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{subtitle}</p>
            )}

            <div className="mt-6">{children}</div>

            {bottomLink && (
              <div className="mt-6 text-sm text-[var(--text-secondary)]">
                {bottomLink.text}{' '}
                <Link
                  className="text-[var(--primary)] font-semibold hover:underline"
                  href={bottomLink.href}
                >
                  {bottomLink.label}
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-[var(--text-secondary)] text-center">
            Secure access • JWT Auth • Business-only data
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}