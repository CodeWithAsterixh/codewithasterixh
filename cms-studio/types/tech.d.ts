export type TechnologiesSection = {
  heading: string;
  items: Array<{
    name: string;
    icon?: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    proficiency: number;
  }>;
};
