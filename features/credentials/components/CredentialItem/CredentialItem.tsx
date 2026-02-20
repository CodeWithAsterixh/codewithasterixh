import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";

export interface CredentialItemProps {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlight?: boolean;
}

export const CredentialItem: React.FC<CredentialItemProps> = ({ period, title, subtitle, description, highlight }) => {
  return (
    <div className="flex flex-col gap-2 mb-8 last:mb-0">
      <Text variant="caption" color="gray" className="mb-1">{period}</Text>
      <Text variant="h4" weight="medium" className={highlight ? "text-primary-blue" : "text-white"}>
        {title}
      </Text>
      <Text variant="body" color="gray" className="text-sm mb-2">{subtitle}</Text>
      <Text variant="body" color="gray" className="leading-relaxed opacity-80">
        {description}
      </Text>
    </div>
  );
};
