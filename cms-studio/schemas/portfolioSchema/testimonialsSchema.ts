import { defineField } from "sanity";
import { headingField } from "../fields/heading";

export const testimonialsSection = defineField({
  name: "testimonialsSection",
  title: "Testimonials Section",
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
