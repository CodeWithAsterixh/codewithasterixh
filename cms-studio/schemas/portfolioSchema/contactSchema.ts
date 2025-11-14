import { defineField } from 'sanity'

export const contactSection = defineField({
  name: 'contact',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string'
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text'
    }),

    defineField({
      name: 'namePlaceholder',
      title: 'Name Placeholder',
      type: 'string'
    }),

    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string'
    }),

    defineField({
      name: 'messagePlaceholder',
      title: 'Message Placeholder',
      type: 'string'
    }),

    defineField({
      name: 'submitLabel',
      title: 'Submit Button Label',
      type: 'string'
    })
  ]
})
