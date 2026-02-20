import React from "react";
import Link from "next/link";
import { ButtonProps } from "./Button.types";

/**
 * Button Component
 * Standard button for actions.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  onClick,
  href,
  target,
  rel,
  disabled,
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="mr-2" size={20} weight="bold" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-2" size={20} weight="bold" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={combinedClasses}>
      {content}
    </button>
  );
};
