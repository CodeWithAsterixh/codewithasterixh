import { defineField } from "sanity";

export const portfolioSection = defineField({
  name: "portfolioSection",
  title: "Portfolio Section",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Section Heading",
      type: "object",
      fields: [
        { name: "small", title: "Small Heading", type: "string" },
        { name: "large", title: "Large Heading", type: "string" },
      ],
    },

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
            { name: "title", title: "Project Title", type: "string" },
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
          ],
        },
      ],
    },
  ],
});
