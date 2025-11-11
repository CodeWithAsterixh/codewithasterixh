'use client'

import { schemaTypes } from 'd/cms-studio/schemas'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { projectConfig } from './cms-studio/config'

export default defineConfig({
  name: 'codewithasterixh-studio',
  title: 'CodeWithAsterixH Studio',
  baseUrl: '/cms-studio',
  projectId: projectConfig.projectId,
  dataset: projectConfig.dataset,

  plugins: [
    deskTool(),       // <--- This adds the main Studio interface
    visionTool(),     // <--- Keep Vision for querying GROQ
  ],

  schema: {
    types: schemaTypes,
  },
})
