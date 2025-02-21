import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title:
    "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh | years of practical exp | project",
  description:
    "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
  keywords:
    "Paul Peter, Projects, Front-End Developer, Web Developer, Portfolio, Next.js, TypeScript, React, Web Design",
  openGraph: {
    title: "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with the actual image URL
        width: 800,
        height: 600,
      },
    ],
    url: "https://codewithasterixh.vercel.app/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Paul Peter | Front-End Developer | CodeWithAsterixh",
    description:
      "Explore the projects of Paul Peter, a front-end developer who builds high-performance web experiences using Next.js, TypeScript, React, and Tailwind CSS. Check out his latest work.",
    images: [
      {
        url: "https://codewithasterixh.vercel.app/images/myImage2.jpg", // Replace with the actual image URL
        width: 800,
        height: 600,
      },
    ],
  },
};

function ProjectsLayout({ children }: Props) {
  return (
    children
  );
}

export default ProjectsLayout;
