import { BaseComponentProps } from "../../types";

export interface CardProps extends BaseComponentProps {
  onClick?: () => void;
  hoverEffect?: boolean;
}
