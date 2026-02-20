import React from "react";
import { Text } from "@/components/ui/atoms/Text/Text";
import profileData from "@/data/profile.json";

export const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-4 bg-[#1a1a1a] rounded-[30px] border border-white/5 mb-6">
      <div className="whitespace-nowrap animate-marquee flex items-center gap-4">
        {[...Array(10)].map((_, i) => (
           <Text key={i} variant="caption" className="mx-4 text-white/30 uppercase">
              {profileData.marquee}
           </Text>
        ))}
      </div>
    </div>
  );
};
