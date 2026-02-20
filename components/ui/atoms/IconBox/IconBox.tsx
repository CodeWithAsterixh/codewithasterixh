import React from "react";
import { IconBoxProps } from "./IconBox.types";

export const IconBox: React.FC<IconBoxProps> = ({
  icon: Icon,
  className = "",
}) => {
  return (
    <div
      className={`
        flex items-center justify-center w-12 h-12 rounded-full 
        border border-white/10 text-white 
        bg-linear-to-br from-white/5 to-transparent
        ${className}
      `}
    >
      <Icon size={24} weight="light" />
    </div>
  );
};
