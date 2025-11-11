import { defineType, defineField } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services Section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
    }),
    defineField({
      name: "items",
      title: "Service Items",
      type: "array",
      of: [
        defineField({
          name: "serviceItem",
          type: "object",
          fields: [
            defineField({
              name: "index",
              title: "Index",
              type: "number",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
            }),
          ],
        }),
      ],
    }),
  ],
});
