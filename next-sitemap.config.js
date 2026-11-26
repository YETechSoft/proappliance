// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://proapplianceexpress.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async () => [
    { loc: '/services/refrigerator', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/cooktop', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/oven', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/dishwasher', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/microwave', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/stove', changefreq: 'daily', priority: 0.8 },
    { loc: '/services/washer', changefreq: 'daily', priority: 0.8 },
  ],
};
