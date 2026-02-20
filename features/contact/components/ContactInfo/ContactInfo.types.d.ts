import { BaseComponentProps } from "@/components/ui/types";
import { IconProps } from "@phosphor-icons/react";

export interface ContactItemProps extends BaseComponentProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  details: string[];
}
