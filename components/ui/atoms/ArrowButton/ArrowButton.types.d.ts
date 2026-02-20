import { BaseComponentProps } from "../../types";

export interface ArrowButtonProps extends BaseComponentProps {
  onClick?: () => void;
  href?: string;
}
