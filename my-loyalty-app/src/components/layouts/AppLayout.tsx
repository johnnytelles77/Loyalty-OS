'use client';

import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  businessName?: string;
  onLogout?: () => void;
  onSelectPage?: (page: any) => void;
}

export default function AppLayout({
  children,
  businessName,
  onLogout,
  onSelectPage,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)]">
      
      {/* Top App Bar */}
      <Navbar
        businessName={businessName}
        onLogout={onLogout}
        onSelectPage={onSelectPage}
      />

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>

      {/* Footer solo al final */}
      <Footer />
    </div>
  );
}