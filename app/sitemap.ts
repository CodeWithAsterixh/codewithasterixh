import { MetadataRoute } from 'next'
import posts from '@/data/posts.json'
import projects from '@/data/projects.json'
import { siteUrl } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
}

