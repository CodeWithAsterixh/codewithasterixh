import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const pricingSection = defineField({
  name: "pricingSection",
  title: "Pricing Section",
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
