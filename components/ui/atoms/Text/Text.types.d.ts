import { BaseComponentProps } from "../../types";

export interface TextProps extends BaseComponentProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "tiny";
  color?: "white" | "gray" | "accent" | "blue";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}
