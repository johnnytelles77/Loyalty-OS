"use client";

import React from "react";

type Variant = "primary" | "secondary" | "danger";

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "w-full md:w-auto px-4 py-2 rounded-xl text-sm font-medium transition tap-target";

  const styles: Record<Variant, string> = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50",
    secondary:
      "bg-transparent border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--primary-soft)] disabled:opacity-50",
    danger:
      "bg-[var(--error)] text-white hover:opacity-90 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, styles[variant], className].join(" ")}
    >
      {children}
    </button>
  );
}