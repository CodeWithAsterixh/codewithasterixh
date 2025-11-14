import { defineField } from "sanity";

export const pricingSection = defineField({
  name: "pricingSection",
  title: "Pricing Section",
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
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "highlight",
              title: "Highlight This Plan",
              type: "boolean",
            },
          ],
        },
      ],
    },
  ],
});
