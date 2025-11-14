import { defineField } from "sanity";

export const hero = defineField({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
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
    }),
    defineField({
      name: "subtext",
      title: "Sub Text",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "object",
      fields: [
        defineField({
          name: "avatars",
          title: "Reviewer Avatars",
          type: "array",
          of: [
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
        defineField({
          name: "count",
          title: "Review Count",
          type: "number",
        }),
        defineField({
          name: "rating",
          title: "Rating",
          type: "number",
        }),
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "badgesGroup",
      title: "Badge Groups",
      type: "array",
      of: [
        defineField({
          name: "badgeGroup",
          title: "Badge Group",
          type: "object",
          fields: [
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                defineField({
                  name: "badge",
                  title: "Badge",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "followText",
      title: "Follow Text",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "social",
          title: "Social",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Href",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Href",
          type: "url",
        }),
      ],
    }),
  ],
});
