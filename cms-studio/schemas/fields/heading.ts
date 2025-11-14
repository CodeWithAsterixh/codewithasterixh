import { defineField } from "sanity";

export const headingField = defineField({
  name: "heading",
  title: "Heading Parts",
  type: "array",
  of: [
    defineField({
      name: "part",
      title: "Heading Part",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: ["even", "odd"],
          },
        }),
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
      ],
    }),
  ],
});
