export interface AboutSection {
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };

  badgeLabel?: string;
  badgeIcon?: string;

  topStatLabel?: string;
  topStatValue?: string;

  headline: string;
  title: string;
  content?: string;

  experiences?: {
    duration: number;
    label: string;
  }[];

  phone?: string;
  email?: string;
}
