import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodeWithAsterixh - Full Stack Developer',
    short_name: 'CodeWithAsterixh',
    description: 'CodeWithAsterixh builds fast and structured web applications with Next.js, React and TypeScript.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F0F',
    theme_color: '#0F0F0F',
    icons: [
      {
        src: '/icon',
        sizes: '500x500',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
