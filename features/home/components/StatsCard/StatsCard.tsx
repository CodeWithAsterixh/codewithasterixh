import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import profileData from "@/data/profile.json";
import React from "react";

export const StatsCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-8">
      {profileData.stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4 rounded-[30px] bg-white/5 border border-white/5 w-full h-full justify-center">
            <Text variant="h3" weight="bold" className="mb-2">{stat.value}</Text>
            <Text variant="tiny" color="gray" className="uppercase tracking-widest whitespace-pre-line">{stat.label}</Text>
        </div>
      ))}
    </Card>
  );
};
