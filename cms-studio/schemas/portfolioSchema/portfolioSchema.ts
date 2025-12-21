import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const portfolioSection = defineField({
  name: "portfolioSection",
  title: "Portfolio Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    headingField,

    {
      name: "description",
      title: "Section Description",
      type: "text",
    },

    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {name: "visibility", title: "show in project list", type: "boolean"},
            { name: "title", title: "Project Title", type: "string" },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "title",
                maxLength: 96,
              },
            },
            { name: "excerpt", title: "Short Description", type: "text" },
            {
              name: "thumbnail",
              title: "Thumbnail Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "url",
              title: "Live Link or Repo",
              type: "url",
            },
            {
              name: "tools",
              title: "Tools Used",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "meta",
              title: "SEO Metadata",
              type: "object",
              description: "SEO metadata for search engines, Open Graph, and Twitter Cards",
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
                  description: "JSON-LD structured data for rich snippets (e.g., CreativeWork, SoftwareApplication)",
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
        },
      ],
    },
  ],
});
