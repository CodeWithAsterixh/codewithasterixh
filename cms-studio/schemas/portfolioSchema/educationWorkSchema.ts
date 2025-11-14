import { defineField } from "sanity";

export const educationWorkSection = defineField({
  name: "educationWorkSection",
  title: "Experience Section",
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
