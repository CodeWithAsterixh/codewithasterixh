import { defineType, defineField } from 'sanity'

export const portfolioSection = defineType({
  name: 'portfolioSection',
  title: 'Portfolio Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineField({
          name: 'projectItem',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'coverImage', title: 'Cover Image', type: 'image' }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: { source: 'title' },
            }),
          ],
        }),
      ],
    }),
  ],
})
