import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import { FilePdfIcon } from "@phosphor-icons/react/ssr";

export const ResumeCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary-blue/10 transition-colors">
          <FilePdfIcon size={32} weight="duotone" className="text-white/30 group-hover:text-primary-blue transition-colors" />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">Curriculum Vitae</Text>
          <Text variant="h4" weight="medium">See Resume</Text>
        </div>
        <ArrowButton href="/resume" />
      </div>
    </Card>
  );
};
