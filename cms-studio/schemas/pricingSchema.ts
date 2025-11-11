import { defineType, defineField } from 'sanity'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [
        defineField({
          name: 'planItem',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
            defineField({ name: 'frequency', title: 'Frequency', type: 'string' }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineField({ name: 'feature', type: 'string' })],
            }),
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'href', title: 'Href', type: 'url' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
