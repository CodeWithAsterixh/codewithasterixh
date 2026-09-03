import { MetadataRoute } from 'next'
import posts from '@/data/posts.json'
import projects from '@/data/projects.json'
import metaData from '@/data/meta.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = metaData.site.url

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

