import { MetadataRoute } from 'next'
import metaData from '@/data/meta.json'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metaData.site.title,
    short_name: metaData.site.shortTitle,
    description: metaData.site.description,
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0F0F0F',
    theme_color: '#0F0F0F',
    categories: ['productivity', 'developer tools', 'portfolio'],
    icons: [
      {
        src: '/icon',
        sizes: '500x500',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
