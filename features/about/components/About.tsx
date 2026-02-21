import React from "react";
import { AboutHero } from "./AboutHero/AboutHero";
import { ExperienceCard } from "./ExperienceCard/ExperienceCard";
import { ProfilesCard } from "@/components/ui/organisms/ProfilesCard/ProfilesCard";
import { ContactCard } from "@/components/ui/organisms/ContactCard/ContactCard";
import { CredentialsCard } from "@/components/ui/organisms/CredentialsCard/CredentialsCard";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import uiData from "@/data/ui.json";

export const About: React.FC = () => {
  const formattedExperience = experienceData.map((item) => ({
    period: `${item.duration.from} - ${item.duration.to}`,
    title: item.title,
    subtitle: item.name,
  }));

  const formattedEducation = educationData.map((item) => ({
    period: `${item.duration.from} - ${item.duration.to}`,
    title: item.title,
    subtitle: item.name,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
      <AboutHero />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ExperienceCard
          title={uiData.about.experience.title}
          items={formattedExperience}
          className="h-full"
        />
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <ExperienceCard
              title={uiData.about.education.title}
              items={formattedEducation}
              className="h-full"
            />{" "}
          </div>
          <div className="col-span-1">
            <ProfilesCard />
          </div>
          <div className="col-span-1">
            <ContactCard />
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <CredentialsCard />
      </div>
    </main>
  );
};
