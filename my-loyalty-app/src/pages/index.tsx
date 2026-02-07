'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 shadow-soft">
      <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{desc}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)]">
      <header className="w-full border-b border-[var(--border-default)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} showText />
          </div>

          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--text-primary)] border border-[var(--border-default)] bg-transparent hover:bg-[var(--primary-soft)] transition"
            >
              Login
            </Link>
            <Link
              href="/register-business"
              className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
            >
              Start free
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-semibold border border-[var(--border-default)]">
                LoyaltyOS • Restaurant Loyalty System
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Turn customers into regulars—simple points, rewards, and promotions.
              </h1>

              <p className="mt-4 text-[var(--text-secondary)] text-lg leading-relaxed">
                Built for tablets at the counter. Add points fast, view history instantly,
                and run promotions your customers actually redeem.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/register-business"
                  className="px-5 py-3 rounded-2xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition"
                >
                  Start free
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-3 rounded-2xl border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] font-semibold hover:bg-[var(--primary-soft)] transition"
                >
                  Login
                </Link>
              </div>

              <div className="mt-4 text-xs text-[var(--text-secondary)]">
                No credit card required • Setup in minutes
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 shadow-soft">
              <div className="text-sm text-[var(--text-secondary)] font-medium">
                Live dashboard preview
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Clients', value: '128' },
                  { label: 'Net Points', value: '4,320' },
                  { label: 'Promos', value: '6' },
                ].map((x) => (
                  <div key={x.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-4">
                    <div className="text-xs text-[var(--text-secondary)]">{x.label}</div>
                    <div className="text-2xl font-bold mt-1 text-[var(--text-primary)]">{x.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-2)] p-4">
                <div className="text-sm font-semibold text-[var(--text-primary)]">Recent activity</div>
                <ul className="mt-2 text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• +10 points — 919-XXX-1234</li>
                  <li>• Redeemed “Free Drink” — 919-XXX-2222</li>
                  <li>• +20 points — 919-XXX-7777</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-6 pb-14">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Everything you need</h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Minimal UI. Fast workflow. Built for real restaurants.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <FeatureCard title="Fast point actions" desc="Search by phone and add/redeem points in seconds." />
            <FeatureCard title="Promotion engine" desc="Create promotions and let customers redeem with points." />
            <FeatureCard title="Audit history" desc="Track every points movement with a clean business history." />
            <FeatureCard title="Tablet-ready UX" desc="Large tap targets and app-like layout for counter use." />
            <FeatureCard title="Secure auth" desc="JWT authentication and protected business data." />
            <FeatureCard title="Metrics dashboard" desc="Clients, net points, active promotions—at a glance." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}