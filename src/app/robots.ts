import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Adjust if admin is private
    },
    sitemap: 'https://sriwebsquad.in/sitemap.xml',
  };
}
