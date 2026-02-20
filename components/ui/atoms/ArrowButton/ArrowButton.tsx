import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ArrowButtonProps } from "./ArrowButton.types";

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  className = "",
  onClick,
  href,
}) => {
  const baseClasses = `
    group flex items-center justify-center w-10 h-10 rounded-full 
    border border-white/10 text-white/40 
    hover:bg-white hover:text-black hover:border-white 
    transition-all duration-300
    ${className}
  `;

  const icon = (
    <ArrowRight 
      size={20} 
      weight="bold" 
      className="transform group-hover:-rotate-45 transition-transform duration-300" 
    />
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {icon}
    </button>
  );
};
