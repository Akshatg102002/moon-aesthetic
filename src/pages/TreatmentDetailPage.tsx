import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { getTreatment, SITE_URL } from '../config/seo';
import { faqSchema, treatmentSchema } from '../config/schema';
import { useBookNow } from '../contexts/BookNowContext';

export default function TreatmentDetailPage() {
  const { slug } = useParams();
  const treatment = getTreatment(slug);
  const { openModal } = useBookNow();
  if (!treatment) return <Navigate to="/treatments" replace />;
  const related = treatment.related.map(getTreatment).filter(Boolean).slice(0, 3);
  const path = `/treatments/${treatment.slug}`;
  const title = `${treatment.title} in Bangalore | Moon Aesthetic`;
  const description = `${treatment.description} Book ${treatment.title.toLowerCase()} consultation at Moon Aesthetic, Kalyan Nagar, Bengaluru.`;
  return <main className="min-h-screen bg-white font-['Poppins'] text-[#333]">
    <SEO title={title} description={description} path={path} keywords={treatment.keywords} image={treatment.image_url} type="article" breadcrumbs={[{name:'Home',url:SITE_URL},{name:'Treatments',url:`${SITE_URL}/treatments`},{name:treatment.title,url:`${SITE_URL}${path}`}]} schema={[...treatmentSchema(treatment), faqSchema(treatment.faqs)]} />
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0"><img src={treatment.image_url} alt={`${treatment.title} at Moon Aesthetic Bangalore`} title={treatment.title} width="1600" height="900" loading="eager" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" /></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 border border-[#C89B3C]/40 rounded-full mb-8"><Sparkles size={14} className="text-[#C89B3C]"/><span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">{treatment.category} Treatment</span></div><h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{treatment.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">Bangalore</span></h1><p className="text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">{treatment.description}</p><button onClick={() => openModal(treatment.title)} className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full"><Calendar size={16} className="inline mr-2 -mt-0.5"/>Book Consultation</button></div>
    </section>
    <section className="py-20 sm:py-28"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_360px] gap-12"><article>
      <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-6">About {treatment.title}</h2><p className="text-[#666] leading-relaxed mb-10">Moon Aesthetic offers {treatment.title.toLowerCase()} at our Kalyan Nagar, Bengaluru clinic with personalized assessment, advanced technology, strict hygiene protocols, and doctor-led treatment planning.</p>
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a1a1a] mb-6">Benefits</h2><ul className="grid sm:grid-cols-2 gap-4 mb-10">{treatment.benefits.map((b)=><li key={b} className="flex gap-3 bg-[#faf9f7] rounded-2xl p-4"><CheckCircle className="text-[#C89B3C] flex-shrink-0" size={20}/><span>{b}</span></li>)}</ul>
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a1a1a] mb-6">Procedure Details</h2><ol className="space-y-4 mb-10">{treatment.procedure.map((p,i)=><li key={p} className="flex gap-4"><span className="w-8 h-8 rounded-full bg-[#C89B3C] text-white flex items-center justify-center flex-shrink-0">{i+1}</span><span className="text-[#666] leading-relaxed">{p}</span></li>)}</ol>
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a1a1a] mb-6">Before & After Care</h2><div className="grid sm:grid-cols-2 gap-6 mb-10"><img src="/images/beforeafter-1.jpg" alt={`${treatment.title} before and after result example`} title={`${treatment.title} before and after`} width="640" height="426" loading="lazy" className="rounded-2xl object-cover w-full aspect-[3/2]"/><img src={treatment.image_url} alt={`${treatment.title} treatment room at Moon Aesthetic`} width="640" height="426" loading="lazy" className="rounded-2xl object-cover w-full aspect-[3/2]"/></div>
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a1a1a] mb-6">FAQs</h2><div className="space-y-4">{treatment.faqs.map((f)=><section key={f.question} className="rounded-2xl border border-gray-100 p-6"><h3 className="font-['Playfair_Display'] text-xl font-bold mb-2">{f.question}</h3><p className="text-[#666]">{f.answer}</p></section>)}</div>
    </article><aside><div className="sticky top-28 bg-[#faf9f7] rounded-3xl p-6"><h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Related Treatments</h2><div className="space-y-3">{related.map((r)=><Link key={r!.slug} to={`/treatments/${r!.slug}`} className="flex items-center justify-between bg-white rounded-xl p-4 text-sm hover:text-[#C89B3C]">{r!.title}<ArrowRight size={14}/></Link>)}</div><Link to="/contact" className="mt-6 inline-flex w-full justify-center px-6 py-3 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white rounded-full text-sm font-semibold">Contact Clinic</Link></div></aside></div></section>
    <a href={`https://wa.me/919113869966?text=Hi%20Moon%20Aesthetic%2C%20I%20would%20like%20to%20know%20about%20${encodeURIComponent(treatment.title)}.`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg" title="Chat on WhatsApp"><MessageCircle size={26} className="text-white" /></a>
  </main>;
}
