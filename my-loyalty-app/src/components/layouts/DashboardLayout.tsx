'use client';

import React from 'react';
import Navbar from '../Navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onSelectPage?: (page: any) => void;
  onLogout?: () => void;
  businessName?: string;
}

export default function DashboardLayout({
  children,
  onSelectPage,
  onLogout,
  businessName,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-beige-50 text-gray-800">
      {/* Top navigation */}
      <Navbar
        businessName={businessName}
        onSelectPage={onSelectPage}
        onLogout={onLogout}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}