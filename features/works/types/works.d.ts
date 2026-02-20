import { BaseComponentProps } from "@/components/ui/types";

export interface Project {
  id: string;
  category: string;
  title: string;
  image: string;
}

export interface ProjectCardProps extends BaseComponentProps {
  project: Project;
}
