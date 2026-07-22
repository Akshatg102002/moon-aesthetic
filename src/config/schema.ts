import { clinic, doctors, SITE_URL, LOGO_URL, toAbsoluteUrl, type Treatment } from './seo';

export const organizationSchema = {
  '@context': 'https://schema.org', '@type': ['MedicalBusiness', 'LocalBusiness'], '@id': `${SITE_URL}/#organization`,
  name: clinic.name, url: SITE_URL, logo: LOGO_URL, image: LOGO_URL, telephone: clinic.telephone, email: clinic.email,
  address: { '@type': 'PostalAddress', ...clinic.address }, geo: { '@type': 'GeoCoordinates', ...clinic.geo }, openingHours: clinic.openingHours,
  sameAs: clinic.sameAs, medicalSpecialty: clinic.specialties, areaServed: clinic.areaServed,
};

export const websiteSchema = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: clinic.name, publisher: { '@id': `${SITE_URL}/#organization` }, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/treatments?search={search_term_string}`, 'query-input': 'required name=search_term_string' } };

export const medicalClinicSchema = {
  '@context': 'https://schema.org', '@type': 'MedicalClinic', '@id': `${SITE_URL}/#clinic`, name: clinic.name, url: SITE_URL,
  telephone: clinic.telephone, address: { '@type': 'PostalAddress', ...clinic.address }, geo: { '@type': 'GeoCoordinates', ...clinic.geo },
  medicalSpecialty: clinic.specialties, areaServed: clinic.areaServed,
  physician: doctors.map((d) => ({ '@type': 'Physician', name: d.name, url: `${SITE_URL}/about#${d.slug}` })),
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) };
}

export function physicianSchema(doctor: typeof doctors[number]) {
  return { '@context': 'https://schema.org', '@type': 'Physician', '@id': `${SITE_URL}/about#${doctor.slug}`, name: doctor.name, image: doctor.image, url: `${SITE_URL}/about#${doctor.slug}`, medicalSpecialty: doctor.specialties, hasCredential: doctor.qualification, worksFor: { '@id': `${SITE_URL}/#clinic` } };
}

export function treatmentSchema(treatment: Treatment) {
  const url = `${SITE_URL}/treatments/${treatment.slug}`;
  const base = { name: treatment.title, description: treatment.description, image: toAbsoluteUrl(treatment.image_url), url, provider: { '@id': `${SITE_URL}/#clinic` }, areaServed: clinic.areaServed };
  return [
    { '@context': 'https://schema.org', '@type': 'MedicalProcedure', '@id': `${url}#procedure`, ...base, medicalSpecialty: treatment.category },
    { '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, ...base, serviceType: treatment.category, offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'INR', url } },
  ];
}

export function faqSchema(faqs: { question: string; answer: string }[]) { return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }; }
