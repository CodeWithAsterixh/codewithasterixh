import { defineField } from "sanity";

export const testimonialsSection = defineField({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Client Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Client Role / Company",
              type: "string",
            }),
            defineField({
              name: "feedback",
              title: "Feedback",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5).required(),
            }),
            defineField({
              name: "avatar",
              title: "Client Avatar",
              type: "image",
            }),
          ],
        }),
      ],
    }),
  ],
});
