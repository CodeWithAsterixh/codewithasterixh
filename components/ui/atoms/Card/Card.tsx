import React from "react";
import { CardProps } from "./Card.types";

/**
 * Card Component
 * Base container for all grid items.
 * Uses a dark background with subtle border/shadow.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverEffect = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-[30px] p-6
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        before:absolute before:inset-0 before:bg-linear-to-b before:from-white/10 before:to-transparent before:pointer-events-none before:z-0
        transition-all duration-300
        ${hoverEffect ? "hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
