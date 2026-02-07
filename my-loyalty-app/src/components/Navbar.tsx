"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type PageKey = "home" | "addPoints" | "history" | "clients" | "promotions";

interface NavbarProps {
  businessName?: string;
  onLogout?: () => void;
  onSelectPage?: (page: PageKey) => void;
}

export default function Navbar({ businessName, onLogout, onSelectPage }: NavbarProps) {
  const [activePage, setActivePage] = useState<PageKey>("home");

  const handleClick = (page: PageKey) => {
    setActivePage(page);
    onSelectPage?.(page);
  };

  const navBtn = (page: PageKey, label: string) => {
    const isActive = activePage === page;

    return (
      <button
        onClick={() => handleClick(page)}
        className={[
          "px-3 py-2 rounded-xl text-sm font-medium transition tap-target",
          "border border-transparent",
          isActive
            ? "bg-[var(--primary-soft)] text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-2)] hover:text-[var(--text-primary)]",
        ].join(" ")}
      >
        {label}
      </button>
    );
  };

  return (
    <header className="w-full border-b border-[var(--border-default)] bg-[var(--bg-card)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <Logo size={40} showText={false} />

          <div className="leading-tight">
            <div className="text-xs text-[var(--text-secondary)]">LoyaltyOS</div>
            <div className="text-base font-semibold text-[var(--text-primary)]">
              {businessName || "Dashboard"}
            </div>
          </div>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navBtn("home", "Dashboard")}
          {navBtn("addPoints", "Puntos")}
          {navBtn("history", "Historial")}
          {navBtn("clients", "Clientes")}
          {navBtn("promotions", "Promociones")}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 min-w-[240px] justify-end">
          <ThemeToggle />

          <button
            onClick={() => onLogout?.()}
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium transition tap-target",
              "bg-[var(--bg-card-2)] text-[var(--text-primary)]",
              "hover:opacity-90 border border-[var(--border-default)]",
            ].join(" ")}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-[var(--border-default)] px-4 py-3 flex gap-2 overflow-x-auto bg-[var(--bg-card)]">
        {navBtn("home", "Dashboard")}
        {navBtn("addPoints", "Puntos")}
        {navBtn("history", "Historial")}
        {navBtn("clients", "Clientes")}
        {navBtn("promotions", "Promos")}
      </div>
    </header>
  );
}