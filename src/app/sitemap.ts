import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sriwebsquad.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other routes here if there are more pages
    {
      url: 'https://sriwebsquad.in/admin',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];
}
