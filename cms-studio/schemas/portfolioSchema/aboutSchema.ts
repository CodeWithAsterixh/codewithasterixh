import { defineField } from 'sanity'

export const aboutSection = defineField({
  name: 'about',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'badgeLabel',
      title: 'Badge Label',
      type: 'string'
    }),

    defineField({
      name: 'badgeIcon',
      title: 'Badge Icon',
      type: 'string'
    }),

    defineField({
      name: 'topStatLabel',
      title: 'Top Stat Label',
      type: 'string'
    }),

    defineField({
      name: 'topStatValue',
      title: 'Top Stat Value',
      type: 'string'
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'text'
    }),

    defineField({
      name: 'experiences',
      title: 'Experience Items',
      type: 'array',
      of: [
        defineField({
          name: 'experience',
          type: 'object',
          fields: [
            defineField({
              name: 'duration',
              title: 'Duration Number',
              type: 'number'
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string'
            })
          ]
        })
      ]
    }),

    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),

    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string'
    })
  ]
})
