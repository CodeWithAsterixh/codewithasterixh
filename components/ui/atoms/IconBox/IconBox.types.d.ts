import { BaseComponentProps } from "../../types";
import { IconProps } from "@phosphor-icons/react";

export interface IconBoxProps extends BaseComponentProps {
  icon: React.ComponentType<IconProps>;
}
