'use client';

import React from 'react';
import Logo from '../components/Logo';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-gray-800 flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Logo size={40} showText />
        </div>

        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          Last updated: February 2026
        </p>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            At <strong>LoyaltyOS</strong>, we respect your privacy and are committed
            to protecting your information.
          </p>

          <p>
            We only collect the data strictly necessary to provide our loyalty
            management services, such as business information, customer records,
            and transactional activity.
          </p>

          <p>
            We do not sell, rent, or share your data with third parties.
            All information is securely stored and protected.
          </p>

          <p>
            By using our platform, you agree to this privacy policy.
          </p>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2026 LoyaltyOS. All rights reserved.
      </footer>
    </div>
  );
}