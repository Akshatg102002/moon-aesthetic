import { useEffect } from 'react';
import JsonLd from './JsonLd';
import { clinic, DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from '../config/seo';
import { breadcrumbSchema } from '../config/schema';

type SEOProps = { title: string; description: string; path: string; keywords?: string[]; image?: string; type?: string; breadcrumbs?: { name: string; url: string }[]; schema?: Record<string, unknown> | Record<string, unknown>[] };

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = content;
}

export default function SEO({ title, description, path, keywords = [], image = DEFAULT_OG_IMAGE, type = 'website', breadcrumbs, schema }: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const imageUrl = toAbsoluteUrl(image);
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large');
    setMeta('meta[name="author"]', 'name', 'author', clinic.name);
    setMeta('meta[name="publisher"]', 'name', 'publisher', clinic.name);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonical;
  }, [title, description, keywords, imageUrl, canonical, type]);
  const data = [breadcrumbs ? breadcrumbSchema(breadcrumbs) : undefined, ...(Array.isArray(schema) ? schema : schema ? [schema] : [])].filter(Boolean) as Record<string, unknown>[];
  return data.length ? <JsonLd data={data} /> : null;
}
