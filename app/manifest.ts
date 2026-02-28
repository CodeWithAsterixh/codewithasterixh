import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asterixh - Software Engineer & Web Developer',
    short_name: 'Asterixh',
    description: 'Asterixh builds functional software and responsive web applications with Next.js, React and TypeScript.',
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
