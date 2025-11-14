import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const educationWorkSection = defineField({
  name: "educationWorkSection",
  title: "Experience Section",
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
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Institution Name", type: "string" },
            { name: "title", title: "Degree or Title", type: "string" },
            {
              name: "duration",
              title: "Duration",
              type: "object",
              fields: [
                { name: "from", title: "From", type: "number" },
                { name: "to", title: "To", type: "number" },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "work",
      title: "Work Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Company Name", type: "string" },
            { name: "title", title: "Role Title", type: "string" },
            {
              name: "duration",
              title: "Duration",
              type: "object",
              fields: [
                { name: "from", title: "From", type: "number" },
                { name: "to", title: "To", type: "number" },
              ],
            },
          ],
        },
      ],
    },
  ],
});
