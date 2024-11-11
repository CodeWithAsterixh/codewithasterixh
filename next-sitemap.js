module.exports = {
  siteUrl: "https://codewithasterixh.vercel.app", // Your website URL
  generateRobotsTxt: true, // Generates robots.txt to help search engines crawl and index your site
  changefreq: "daily", // Change frequency of content updates (adjust based on your website's update rate)
  priority: 1.0, // Set default priority for all pages (highest priority)
  sitemapSize: 5000, // Maximum pages per sitemap (useful for very large websites)
  exclude: ["/404", "/server-sitemap.xml", "/some-other-page-to-exclude"], // Exclude any pages you don't want indexed
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/api/", "/images/", "/files/", "/files/", "/svgs/"], // Adjust disallowed pages for SEO purposes
        allow: ["/"], // Allow everything else to be indexed
      },
    ],
  },
  // Optionally include specific rules for certain pages or dynamic paths
  transform: async (config, path) => {
    // Adjust priority based on specific path types (e.g., higher priority for home and key pages)
    if (path === "/" || path === "/about" || path === "/projects") {
      return {
        loc: path,
        priority: 1.0, // Highest priority for these pages
        changefreq: "daily", // Change frequently
      };
    }
    return {
      loc: path,
      priority: 1.0, // Default priority for other pages
      changefreq: "weekly", // Change less frequently
    };
  },
};
