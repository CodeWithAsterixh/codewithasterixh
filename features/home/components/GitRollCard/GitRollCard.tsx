import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import Image from "next/image";
import uiData from "@/data/ui.json";

export const GitRollCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex flex-col gap-2 items-end justify-between">
        <div className="flex flex-col gap-2">
          <Text variant="h3" color="gray">
            {uiData.home.gitRollCard.title}
          </Text>
          <a
            href="https://gitroll.io/profile/u9O4HVGNJYNWrqSbujKpgfOuTcmO2"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://gitroll.io/api/badges/profiles/v1/u9O4HVGNJYNWrqSbujKpgfOuTcmO2?theme=dark"
              alt="GitRoll Profile Badge"
              width={180}
              height={40}
              className="h-auto w-auto"
              unoptimized
            />
          </a>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Text variant="caption" color="gray">
            {uiData.home.gitRollCard.title}
          </Text>
          <ArrowButton
            href="https://gitroll.io/profile/u9O4HVGNJYNWrqSbujKpgfOuTcmO2"
            target="_blank"
          />
        </div>
      </div>
    </Card>
  );
};
