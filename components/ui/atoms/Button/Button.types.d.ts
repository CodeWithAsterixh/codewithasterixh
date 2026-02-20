import { BaseComponentProps } from "../../types";
import { IconProps } from "@phosphor-icons/react";

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<IconProps>;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}
