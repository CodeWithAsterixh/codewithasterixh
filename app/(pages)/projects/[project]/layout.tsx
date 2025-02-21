import HeroSection from "@/ui/components/Hero/Hero";
import React from "react";

type Props = {
  children: React.ReactNode;
};


function ProjectLayout({ children }: Props) {
  return (
    <div className="size-full">
      <HeroSection
        main="Project | Showcasing My Work"
        sub="Find out more about this project."
        cta={{ navto: "#project", text: "Continue" }}
      />

      {children}
    </div>
  );
}

export default ProjectLayout;
