import {
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  project10,
  project11,
} from "./projectsDatas";

export type projectType = "best" | "others";

export interface ProjectSchema {
  name: string;
  p_id: string;
  startDate: string;
  finishDate: string;
  technologies: string[];
  currentVersion: string;
  status: string;
  overview: {
    description: string;
    keyFeatures: string[];
  };
  updates: {
    id: number;
    date: string;
    version: string;
    updateFeatures: string[];
  }[];
  futureGoals: string[];
  thumbnail: string[];
  url: string;
  source: string;
  id: number;
  type: projectType | string;
}

export const projectsData: ProjectSchema[] = [
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  project10,
  project11,
];
