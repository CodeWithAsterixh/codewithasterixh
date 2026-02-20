import { BaseComponentProps } from "@/components/ui/types";
import { IconProps } from "@phosphor-icons/react";

export interface ServiceItem {
  icon: React.ComponentType<IconProps>;
  title: string;
  description?: string;
}

export interface ServiceMenuProps extends BaseComponentProps {
  items: ServiceItem[];
}

export interface ServiceOfferingProps extends BaseComponentProps {
  items: ServiceItem[];
}
