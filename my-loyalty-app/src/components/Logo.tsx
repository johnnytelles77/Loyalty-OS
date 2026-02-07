import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 48, showText = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon */}
      <div
        style={{ width: size, height: size }}
        className="rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm"
      >
        <span className="text-xl leading-none">L</span>
      </div>

      {/* Text */}
      {showText && (
        <span className="text-2xl font-semibold tracking-tight text-gray-900">
          Loyalty<span className="text-indigo-600">OS</span>
        </span>
      )}
    </div>
  );
}