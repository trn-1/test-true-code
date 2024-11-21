
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = 'http://localhost:3000';

  return [
    {
      url: site,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: site + 'catalog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: site + 'product',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ]
}
