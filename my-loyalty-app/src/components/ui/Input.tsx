"use client";

import React, { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border px-3 py-2 text-sm outline-none transition",
        "bg-[var(--bg-card)] border-[var(--border-default)]",
        "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]",
        "focus:ring-2 focus:ring-[var(--primary-soft)]",
        "focus:border-[var(--primary)]",
        props.className || "",
      ].join(" ")}
    />
  );
}