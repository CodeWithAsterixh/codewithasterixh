import React from "react";
import { Marquee } from "./Marquee/Marquee";
import { ProjectsCard } from "./ProjectsCard/ProjectsCard";
import { BlogCard } from "./BlogCard/BlogCard";
import { ServicesCard } from "./ServicesCard/ServicesCard";
import { StatsCard } from "./StatsCard/StatsCard";
import { ProfileCard } from "@/components/ui/organisms/ProfileCard/ProfileCard";
import { CredentialsCard } from "@/components/ui/organisms/CredentialsCard/CredentialsCard";
import { ProfilesCard } from "@/components/ui/organisms/ProfilesCard/ProfilesCard";
import { ContactCard } from "@/components/ui/organisms/ContactCard/ContactCard";

export const Home: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top Left: Profile */}
        <div className="col-span-1 md:col-span-2 row-span-1 h-full">
          <ProfileCard titleAs="h1" />
        </div>

        {/* Top Right Group */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <Marquee />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <CredentialsCard />
            <ProjectsCard />
          </div>
        </div>

        {/* Middle Row */}
        <div className="col-span-1">
          <BlogCard />
        </div>
        <div className="col-span-1">
          <ServicesCard />
        </div>
        <div className="col-span-1">
          <ProfilesCard />
        </div>

        {/* Bottom Row */}
        <div className="col-span-1">
          <ContactCard />
        </div>
        <div className="col-span-1 md:col-span-2">
          <StatsCard />
        </div>
      </div>
    </main>
  );
};
