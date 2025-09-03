import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/cart', '/checkout', '/api/'],
      crawlDelay: 5,
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  }
}

