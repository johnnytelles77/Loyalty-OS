import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-2xl border shadow-sm",
        "bg-[var(--bg-card)] border-[var(--border-default)]",
        "text-[var(--text-primary)]",
        className,
      ].join(" ")}
    >
      <div className="p-6">{children}</div>
    </section>
  );
}