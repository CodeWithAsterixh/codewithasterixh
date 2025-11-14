import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const technologiesSection = defineField({
  name: "technologiesSection",
  title: "Technologies Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    headingField,
    defineField({
      name: "items",
      title: "Tool Items",
      type: "array",
      of: [
        defineField({
          name: "toolItem",
          title: "Tool Item",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Image",
              type: "image",
            }),
            defineField({
              name: "proficiency",
              title: "Proficiency",
              type: "number",
              description: "Number from 0 to 100",
            }),
          ],
        }),
      ],
    }),
  ],
});
