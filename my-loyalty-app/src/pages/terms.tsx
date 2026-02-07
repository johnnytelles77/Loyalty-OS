'use client';

import React from 'react';
import Logo from '../components/Logo';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-gray-800 flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Logo size={40} showText />
        </div>

        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">
          Last updated: February 2026
        </p>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            By accessing or using <strong>LoyaltyOS</strong>, you agree to be bound
            by these Terms of Service.
          </p>

          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and all activity that occurs under your account.
          </p>

          <p>
            You agree not to misuse the platform, attempt unauthorized access,
            or disrupt system integrity.
          </p>

          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2026 LoyaltyOS. All rights reserved.
      </footer>
    </div>
  );
}