import { defineType } from "sanity";

import { aboutSection } from "./aboutSchema";
import { contactSection } from "./contactSchema";
import { hero } from "./heroSchema";
import { pricingSection } from "./pricingSchema";
import { testimonialsSection } from "./testimonialsSchema";
import { educationWorkSection } from "./educationWorkSchema";
import { portfolioSection } from "./portfolioSchema";
import { servicesSection } from "./servicesSchema";
import { technologiesSection } from "./techSchema";

const schemaTypes = [
  aboutSection,
  contactSection,
  hero,
  pricingSection,
  testimonialsSection,
  educationWorkSection,
  portfolioSection,
  servicesSection,
  technologiesSection,
];

const portfolioSchema = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    ...schemaTypes,
    {
      name: "meta",
      title: "SEO Metadata",
      type: "object",
      description: "SEO metadata for the homepage",
      fields: [
        {
          name: "title",
          title: "Meta Title",
          type: "string",
          description: "Title for meta title tag (50-60 characters for optimal SEO)",
          validation: (Rule) => Rule.max(60).warning("Meta titles should be under 60 characters"),
        },
        {
          name: "description",
          title: "Meta Description",
          type: "text",
          description: "Description for meta description tag (150-160 characters for optimal SEO)",
          validation: (Rule) => Rule.max(160).warning("Meta descriptions should be under 160 characters"),
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "Array of relevant keywords for SEO",
        },
        {
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Canonical URL to prevent duplicate content issues",
        },
        {
          name: "robots",
          title: "Robots Directive",
          type: "string",
          description: "Robots meta tag content (e.g., 'index, follow')",
          initialValue: "index, follow",
        },
        {
          name: "ogTitle",
          title: "Open Graph Title",
          type: "string",
          description: "Title for Open Graph (Facebook) sharing",
        },
        {
          name: "ogDescription",
          title: "Open Graph Description",
          type: "text",
          description: "Description for Open Graph sharing",
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image for Open Graph sharing (1200x630 recommended)",
          options: { hotspot: true },
        },
        {
          name: "twitterTitle",
          title: "Twitter Card Title",
          type: "string",
          description: "Title for Twitter Card sharing",
        },
        {
          name: "twitterDescription",
          title: "Twitter Card Description",
          type: "text",
          description: "Description for Twitter Card sharing",
        },
        {
          name: "twitterImage",
          title: "Twitter Card Image",
          type: "image",
          description: "Image for Twitter Card sharing (1200x600 recommended)",
          options: { hotspot: true },
        },
        {
          name: "structuredData",
          title: "Structured Data (JSON-LD)",
          type: "text",
          description: "JSON-LD structured data for rich snippets",
          validation: (Rule) => Rule.custom((value) => {
            if (!value || typeof value !== 'string') return true;
            try {
              JSON.parse(value);
              return true;
            } catch {
              return "Invalid JSON format";
            }
          }),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.headline",
    },
  },
});

export default portfolioSchema;
