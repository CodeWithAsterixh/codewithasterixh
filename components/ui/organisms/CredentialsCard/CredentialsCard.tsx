import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { ArrowButton } from "@/components/ui/atoms/ArrowButton/ArrowButton";
import Image from "next/image";
import profileData from "@/data/profile.json";
import uiData from "@/data/ui.json";

export const CredentialsCard: React.FC = () => {
  return (
    <Card className="h-full flex flex-col justify-between group">
      <div className="flex-1 flex items-center justify-center mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
         {/* Signature Placeholder */}
         {profileData.images.signature && (
            <Image 
                src={profileData.images.signature.src} 
                width={profileData.images.signature.width} 
                height={profileData.images.signature.height} 
                alt={profileData.images.signature.alt} 
                className="invert opacity-50" 
            />
         )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <Text variant="caption" color="gray" className="mb-1">{uiData.common.credentialsCard.subtitle}</Text>
          <Text variant="h4" weight="medium">{uiData.common.credentialsCard.title}</Text>
        </div>
        <ArrowButton href="/credentials" />
      </div>
    </Card>
  );
};
