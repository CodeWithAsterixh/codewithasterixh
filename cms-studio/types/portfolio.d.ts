import { IconName } from "lucide-react/dynamic";

// Sanity raw image type
export type SanityImageRaw = {
  _type?: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

// Ready image type (URL string)
export type ImageReady = string;

export type Experience = {
  duration: number;
  label: string;
};

export type About = {
  badgeIcon: string;
  badgeLabel: string;
  content: string;
  email: string;
  experiences: Experience[];
  headline: string;
  heading: Heading[];
  image: SanityImageRaw;
  phone: string;
  topStatLabel: string;
  topStatValue: string;
};

export type Contact = {
  emailPlaceholder: string;
  messagePlaceholder: string;
  namePlaceholder: string;
  submitLabel: string;
  subtitle: string;
  tagline: string;
  title: string;
};

export type Duration = {
  from: number;
  to: number;
};

export type Education = {
  _key: string;
  duration: Duration;
  name: string;
  title: string;
};

export type Work = {
  _key: string;
  duration: Duration;
  name: string;
  title: string;
};

export type EducationWorkSection = {
  heading: Heading[];
  headline: string;
  education: Education[];
  work: Work[];
};

export type BadgeGroup = {
  _key: string;
  items: string[];
};

export type Heading = {
  _key: string;
  text: string;
  type: "even" | "odd";
};

export type Social = {
  _key: string;
  href: string;
  icon: IconName;
};

export type Hero = {
  badgesGroup: BadgeGroup[];
  followText: string;
  heading: Heading[];
  headline: string;
  heroImage: SanityImageRaw;
  primaryCta: { href: string; label: string };
  quote: string;
  reviews: {
    avatars: SanityImageRaw[];
    count: number;
    label: string;
    rating: number;
  };
  secondaryCta: { href: string; label: string };
  socials: Social[];
  subtext: string;
};

export type ProjectMeta = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: SanityImageRaw;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: SanityImageRaw;
  structuredData: string;
};

export type Project = {
  _key: string;
  excerpt: string;
  slug: {
    current: string;
  };
  tags: string[];
  thumbnail: SanityImageRaw;
  title: string;
  tools: string[];
  url: string;
  meta: ProjectMeta;
};

export type PortfolioSection = {
  description: string;
  heading: Heading[];
  headline: string;
  projects: Project[];
};

export type Plan = {
  _key: string;
  duration: string;
  features: string[];
  highlight: boolean;
  name: string;
  price: string;
};

export type PricingSection = {
  heading: Heading[];
  headline: string;
  plans: Plan[];
};

export type ServiceItem = {
  _key: string;
  description: string;
  image: SanityImageRaw;
  index: number;
  label: string;
  tags: string[];
};

export type ServicesSection = {
  heading: Heading[];
  headline: string;
  intro: string;
  items: ServiceItem[];
};

export type Technology = {
  _key: string;
  icon: string;
  name: string;
  proficiency: number;
};

export type TechnologiesSection = {
  heading: Heading[];
  headline: string;
  items: Technology[];
};

export type Testimonial = {
  _key: string;
  avatar: SanityImageRaw;
  feedback: string;
  name: string;
  rating: number;
  role: string;
};

export type TestimonialsSection = {
  heading: Heading[];
  headline: string;
  testimonials: Testimonial[];
};

export type PortfolioMeta = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: SanityImageRaw;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: SanityImageRaw;
  structuredData: string;
};

export type Portfolio = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "portfolio";
  about: About;
  contact: Contact;
  educationWorkSection: EducationWorkSection;
  hero: Hero;
  portfolioSection: PortfolioSection;
  pricingSection: PricingSection;
  servicesSection: ServicesSection;
  technologiesSection: TechnologiesSection;
  testimonialsSection: TestimonialsSection;
  meta: PortfolioMeta;
};
