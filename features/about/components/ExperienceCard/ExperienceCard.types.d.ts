import { BaseComponentProps } from "@/components/ui/types";

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface ExperienceCardProps extends BaseComponentProps {
  title: string;
  items: TimelineItem[];
}
