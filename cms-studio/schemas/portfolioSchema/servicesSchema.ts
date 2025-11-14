import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const servicesSection = defineField({
  name: "servicesSection",
  title: "Services Section",
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
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
    },

    {
      name: "items",
      title: "Service Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "index",
              title: "Index Number",
              type: "number",
            },
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
