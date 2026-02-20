/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TextProps } from "./Text.types";

export const Text: React.FC<TextProps> = ({
  children,
  className = "",
  variant = "body",
  color = "white",
  weight = "normal",
  align = "left",
  as,
}) => {
  const Component = as || (["h1", "h2", "h3", "h4"].includes(variant) ? variant : "p") as any;

  const styles = {
    h1: "text-4xl md:text-5xl lg:text-6xl tracking-tight",
    h2: "text-3xl md:text-4xl tracking-tight",
    h3: "text-2xl md:text-3xl",
    h4: "text-xl md:text-2xl",
    body: "text-base leading-relaxed",
    caption: "text-sm text-white/50 uppercase tracking-wider",
    tiny: "text-xs",
  };

  const colors = {
    white: "text-white",
    gray: "text-white/50",
    accent: "text-white/70",
    blue: "text-primary-blue",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Component
      className={`${styles[variant]} ${colors[color]} ${weights[weight]} ${aligns[align]} ${className}`}
    >
      {children}
    </Component>
  );
};
