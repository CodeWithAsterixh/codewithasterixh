import { defineField } from "sanity";

export const servicesSection = defineField({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'object',
      fields: [
        { name: 'small', title: 'Small Heading', type: 'string' },
        { name: 'large', title: 'Large Heading', type: 'string' }
      ]
    },

    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text'
    },

    {
      name: 'items',
      title: 'Service Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'index',
              title: 'Index Number',
              type: 'number'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }]
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    }
  ]
});
