import { defineType, defineField } from 'sanity'

export const technologiesSection = defineType({
  name: 'technologiesSection',
  title: 'Technologies Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Tool Items',
      type: 'array',
      of: [
        defineField({
          name: 'toolItem',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
})
