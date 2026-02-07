"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Github, X } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-card)]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo size={34} showText={false} />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                Loyalty<span className="text-[var(--primary)]">OS</span>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Customer Loyalty Platform</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)] justify-center">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition">
              Terms
            </Link>
            <Link href="/support" className="hover:text-[var(--text-primary)] transition">
              Support
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2 justify-end">
            <SocialIcon href="https://x.com" label="X">
              <X size={18} />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Instagram size={18} />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Facebook size={18} />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
            <SocialIcon href="https://github.com/johnnytelles77" label="GitHub">
              <Github size={18} />
            </SocialIcon>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-[var(--text-secondary)]">
          <span>© {new Date().getFullYear()} LoyaltyOS. All rights reserved.</span>
          <span className="opacity-80">Built with Next.js + Spring Boot</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-2)] hover:opacity-90 flex items-center justify-center transition text-[var(--text-primary)]"
    >
      {children}
    </a>
  );
}