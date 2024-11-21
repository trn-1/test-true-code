
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = `${process.env.NEXT_PUBLIC_CLIENT_HOST}/`;

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
