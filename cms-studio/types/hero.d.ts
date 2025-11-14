export interface HeroType {
  headline: string;
  heading: {
    type: "even" | "odd";
    text: string;
  }[];
  subtext: string;
  heroImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  quote: string;
  reviews: {
    avatars: {
      asset: {
        _ref: string;
        _type: string;
      };
    }[];
    count: number;
    rating: number;
    label: string;
  };
  badgesGroup: {
    items: string[];
  }[];
  followText: string;
  socials: {
    icon: string;
    href: string;
  }[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}
