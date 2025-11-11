import { defineType, defineField } from 'sanity'

export const educationWorkSection = defineType({
  name: 'educationWorkSection',
  title: 'Education and Work',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineField({
          name: 'educationItem',
          type: 'object',
          fields: [
            defineField({ name: 'institution', title: 'Institution', type: 'string' }),
            defineField({ name: 'degree', title: 'Degree', type: 'string' }),
            defineField({ name: 'from', title: 'From', type: 'string' }),
            defineField({ name: 'to', title: 'To', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'work',
      title: 'Work',
      type: 'array',
      of: [
        defineField({
          name: 'workItem',
          type: 'object',
          fields: [
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'company', title: 'Company', type: 'string' }),
            defineField({ name: 'from', title: 'From', type: 'string' }),
            defineField({ name: 'to', title: 'To', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
})
