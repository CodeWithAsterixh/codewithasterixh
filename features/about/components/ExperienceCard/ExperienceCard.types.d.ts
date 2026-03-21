import { BaseComponentProps } from "@/components/ui/types";

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  duration: { from: number; to: number };
  name: string;
  role?: string;
  workType?: string;
  stacks?: string[];
  achievements?: string[];
}

export interface ExperienceCardProps extends BaseComponentProps {
  title: string;
  items: TimelineItem[];
}
