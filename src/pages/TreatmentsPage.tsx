import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Droplets, Zap, Clock, Scissors, Eye, Sun, Flame,
  HeartPulse, Syringe, Wind, ArrowRight, Calendar, MessageCircle,
  CheckCircle, Shield
} from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';
import SEO from '../components/SEO';
import { pages, SITE_URL } from '../config/seo';
import { breadcrumbSchema } from '../config/schema';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  image_url: string;
  category: string;
  features?: string;
}

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  droplets: Droplets,
  sparkles: Sparkles,
  sun: Sun,
  wind: Wind,
  flame: Flame,
  clock: Clock,
  syringe: Syringe,
  scissors: Scissors,
  heartpulse: HeartPulse,
  zap: Zap,
};

const defaultServices: Service[] = [
  { id: 1, title: 'Skin Consultation', slug: 'skin-consultation', description: 'Comprehensive skin analysis and personalized treatment planning by our expert cosmetologists.', icon_name: 'eye', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 2, title: 'Acne Treatment', slug: 'acne-treatment', description: 'Targeted therapies to treat active acne, reduce inflammation, and prevent future breakouts.', icon_name: 'droplets', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 3, title: 'Acne Scar Treatment', slug: 'acne-scar-treatment', description: 'Advanced treatments including microneedling and laser to diminish acne scarring and smooth skin texture.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 4, title: 'Pigmentation Treatment', slug: 'pigmentation-treatment', description: 'Effective solutions for melasma, sun spots, and uneven skin tone using laser and chemical treatments.', icon_name: 'sun', image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 5, title: 'Hydrafacial', slug: 'hydrafacial', description: 'Multi-step hydration treatment that cleanses, exfoliates, extracts, and hydrates for instant glow.', icon_name: 'droplets', image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 6, title: 'Chemical Peels', slug: 'chemical-peels', description: 'Medical-grade peels to resurface skin, reduce blemishes, and reveal a brighter, smoother complexion.', icon_name: 'flame', image_url: 'https://images.unsplash.com/photo-1607969341901-1a1e8e22b5f1?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 7, title: 'Carbon Facial', slug: 'carbon-facial', description: 'Laser carbon peel treatment for deep pore cleansing, oil reduction, and skin rejuvenation.', icon_name: 'wind', image_url: 'https://images.unsplash.com/photo-1515377905703-c4788f09f098?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 8, title: 'Skin Rejuvenation', slug: 'skin-rejuvenation', description: 'Comprehensive treatments to restore youthful vitality, improve texture, and revitalize dull skin.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1559599076-9c61d8e1b77c?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 9, title: 'Anti-Aging Treatments', slug: 'anti-aging-treatments', description: 'Botox, fillers, and non-surgical solutions to reduce fine lines, wrinkles, and restore youthful contours.', icon_name: 'clock', image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', category: 'Anti-Aging' },
  { id: 10, title: 'PRP Therapy', slug: 'prp-therapy', description: "Platelet-rich plasma therapy for skin rejuvenation and hair restoration using your body's own growth factors.", icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 11, title: 'Hair Fall Treatment', slug: 'hair-fall-treatment', description: 'Medical-grade treatments to address hair thinning and excessive hair fall with proven therapies.', icon_name: 'scissors', image_url: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 12, title: 'Hair Regrowth Treatment', slug: 'hair-regrowth-treatment', description: 'Advanced regrowth protocols combining PRP, mesotherapy, and topical treatments for denser, healthier hair.', icon_name: 'heartpulse', image_url: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 13, title: 'Laser Hair Removal', slug: 'laser-hair-removal', description: 'Safe and effective permanent hair reduction using advanced laser technology for all skin types.', icon_name: 'zap', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80', category: 'Laser' },
  { id: 14, title: 'IV Infusion Therapy', slug: 'iv-infusion-therapy', description: 'Intravenous vitamin and nutrient infusions for skin glow, immunity boost, and overall wellness.', icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80', category: 'Wellness' },
  { id: 15, title: 'MNRF Treatment', slug: 'mnrf-treatment', description: 'Microneedling Radiofrequency (MNRF) combines micro-injuries with RF energy to stimulate collagen, tighten skin, and reduce scars and pores.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 16, title: 'GFC Treatment', slug: 'gfc-treatment', description: 'Growth Factor Concentrate (GFC) therapy uses your own concentrated growth factors to promote hair regrowth and skin rejuvenation.', icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1626278664285-f796b9ee7806?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 17, title: 'Anti Dandruff Treatment', slug: 'anti-dandruff-treatment', description: 'Targeted scalp treatments to eliminate dandruff, soothe irritation, and restore a healthy, flake-free scalp.', icon_name: 'droplets', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
];

const categories = ['All', 'Skin', 'Hair', 'Laser', 'Anti-Aging', 'Wellness'];

const categoryDescriptions: Record<string, string> = {
  All: 'Explore our complete range of advanced aesthetic treatments designed to enhance your natural beauty.',
  Skin: 'Targeted skin treatments for acne, pigmentation, rejuvenation, and overall skin health.',
  Hair: 'Advanced hair fall and regrowth treatments using PRP, mesotherapy, and proven medical therapies.',
  Laser: 'Precision laser procedures for permanent hair removal and skin resurfacing.',
  'Anti-Aging': 'Non-surgical solutions to reduce fine lines, wrinkles, and restore youthful contours.',
  Wellness: 'IV infusions and wellness therapies for skin glow, immunity, and overall vitality.',
};

const highlights = [
  { icon: Shield, text: 'FDA-Approved Technology' },
  { icon: CheckCircle, text: 'Qualified Cosmetologists' },
  { icon: Sparkles, text: 'Personalized Treatment Plans' },
];

export default function TreatmentsPage() {
  const { openModal } = useBookNow();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((s: Service) => ({ ...s, category: s.category || s.features || 'Skin' })));
        } else {
          setServices(defaultServices);
        }
        setLoading(false);
      })
      .catch(() => {
        setServices(defaultServices);
        setLoading(false);
      });
  }, []);

  const displayServices = services.length > 0 ? services : defaultServices;

  const filtered = activeCategory === 'All'
    ? displayServices
    : displayServices.filter((s) => s.category === activeCategory);

  const page = pages.find((p) => p.slug === 'treatments')!;

  return (
    <>
      <SEO title={page.title} description={page.description} path={page.path} keywords={page.keywords} image={page.image} breadcrumbs={[{ name: 'Home', url: SITE_URL }, { name: page.slug === 'treatments' ? 'Treatments' : page.slug === 'about' ? 'About' : 'Contact', url: `${SITE_URL}${page.path}` }]} schema={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: page.slug === 'treatments' ? 'Treatments' : page.slug === 'about' ? 'About' : 'Contact', url: `${SITE_URL}${page.path}` }])} />
    <div className="min-h-screen bg-white font-['Poppins'] text-[#333]">

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-skin.jpg"
            alt="Moon Aesthetic Treatments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" />
        </div>
        <div className="absolute top-24 right-16 w-80 h-80 border border-[#C89B3C]/15 rounded-full hidden lg:block" />
        <div className="absolute bottom-16 left-16 w-56 h-56 border border-[#C89B3C]/10 rounded-full hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 border border-[#C89B3C]/40 rounded-full mb-8">
              <div className="w-2 h-2 bg-[#C89B3C] rounded-full animate-pulse" />
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">
                Signature Treatments
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">Treatments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          >
            Discover our comprehensive range of advanced aesthetic treatments designed to enhance your natural beauty with safe, evidence-based procedures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            {highlights.map((h) => (
              <div key={h.text} className="flex items-center gap-2 text-white/50">
                <h.icon size={16} className="text-[#C89B3C]" />
                <span className="text-xs tracking-wider uppercase">{h.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER + TREATMENTS GRID ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white shadow-lg shadow-[#C89B3C]/20'
                    : 'bg-[#faf9f7] text-[#888] hover:bg-[#C89B3C]/10 hover:text-[#C89B3C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-[#888] max-w-2xl mx-auto mb-14 font-['Poppins'] text-sm"
          >
            {categoryDescriptions[activeCategory]}
          </motion.p>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-gray-100">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-4/5 mb-4" />
                    <div className="h-10 bg-gray-200 rounded-full w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((service, index) => {
                const Icon = iconMap[service.icon_name] || Sparkles;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => navigate(`/treatments/${service.slug}`)}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-xl hover:shadow-[#C89B3C]/10 transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.image_url}
                        alt={`${service.title} treatment at Moon Aesthetic`}
                        title={service.title}
                        width="640"
                        height="426"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon size={20} className="text-[#C89B3C]" />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-[#C89B3C]/90 text-white text-[10px] tracking-wider uppercase font-medium rounded-full">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#C89B3C] transition-colors"><Link to={`/treatments/${service.slug}`} onClick={(e) => e.stopPropagation()}>{service.title}</Link></h3>
                      <p className="text-[#888] text-sm leading-relaxed mb-5 font-['Poppins']">
                        {service.description}
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); openModal(service.title); }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-xs tracking-[0.12em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all"
                      >
                        Book Now <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== TREATMENT CATEGORIES OVERVIEW ===== */}
      <section className="py-20 sm:py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Treatment Categories</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Areas of <span className="text-[#C89B3C]">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { cat: 'Skin', count: displayServices.filter(s => s.category === 'Skin').length, img: '/images/service-skin.jpg', desc: 'Acne, pigmentation, facials, peels, rejuvenation, and comprehensive skin health.' },
              { cat: 'Hair', count: displayServices.filter(s => s.category === 'Hair').length, img: '/images/service-hair.jpg', desc: 'Hair fall control, regrowth therapy, PRP, and advanced scalp treatments.' },
              { cat: 'Laser', count: displayServices.filter(s => s.category === 'Laser').length, img: '/images/service-laser.jpg', desc: 'Permanent hair removal, skin resurfacing, and precision laser procedures.' },
              { cat: 'Anti-Aging', count: displayServices.filter(s => s.category === 'Anti-Aging').length, img: '/images/service-antiaging.jpg', desc: 'Botox, fillers, and non-surgical solutions for youthful, natural results.' },
            ].map((item, index) => (
              <motion.div
                key={item.cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveCategory(item.cat)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-xl hover:shadow-[#C89B3C]/10 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.cat}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white">{item.cat}</h3>
                    <p className="text-[#C89B3C] text-xs tracking-wider uppercase font-medium">{item.count} Treatment{item.count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[#888] text-sm leading-relaxed font-['Poppins']">{item.desc}</p>
                  <span className="flex items-center gap-1.5 text-[#C89B3C] text-xs font-semibold mt-3 group-hover:gap-2.5 transition-all">
                    View Treatments <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your <span className="text-[#C89B3C]">Treatment?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 font-['Poppins']">
              Book a personalized consultation with our expert doctors to find the right treatment for your skin and hair concerns.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openModal()}
                className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all hover:-translate-y-0.5"
              >
                <Calendar size={16} className="inline mr-2 -mt-0.5" />
                Book Appointment
              </button>
              <a
                href="tel:+919113869966"
                className="px-8 py-4 border-2 border-white/30 text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FLOATING WHATSAPP ===== */}
      <a
        href="https://wa.me/919113869966?text=Hi%20Moon%20Aesthetic%2C%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
    </>
  );
}
