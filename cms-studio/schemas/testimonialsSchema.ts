import { defineField, defineType } from "sanity";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
            }),
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
            }),
          ],
        }),
      ],
    }),
  ],
});
