import fs from 'node:fs';
const SITE = 'https://moonaesthetic.in';
const source = fs.readFileSync('src/config/seo.ts', 'utf8');
const treatmentSection = source.split('export const doctors =')[0];
const treatmentSlugs = [...treatmentSection.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
const pages = ['/', '/about', '/treatments', '/contact', ...treatmentSlugs.map((slug) => `/treatments/${slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((path) => `  <url><loc>${SITE}${path}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${path === '/' ? '1.0' : path.startsWith('/treatments/') ? '0.8' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('public/sitemap.xml', xml);
