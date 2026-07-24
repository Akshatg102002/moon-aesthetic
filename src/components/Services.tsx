import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, Zap, Clock, Scissors, Eye, Sun, Flame, HeartPulse, Syringe, Wind, Crosshair, ArrowRight } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

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
  crosshair: Crosshair,
  zap: Zap,
};

const defaultServices: Service[] = [
  { id: 1, title: 'Skin Consultation', slug: 'skin-consultation', description: 'Comprehensive skin analysis and personalized treatment planning by our expert cosmetologists.', icon_name: 'eye', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 2, title: 'Acne Treatment', slug: 'acne-treatment', description: 'Targeted therapies to treat active acne, reduce inflammation, and prevent future breakouts.', icon_name: 'droplets', image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 3, title: 'Acne Scar Treatment', slug: 'acne-scar-treatment', description: 'Advanced treatments including microneedling and laser to diminish acne scarring and smooth skin texture.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 4, title: 'Pigmentation Treatment', slug: 'pigmentation-treatment', description: 'Effective solutions for melasma, sun spots, and uneven skin tone using laser and chemical treatments.', icon_name: 'sun', image_url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 5, title: 'Hydrafacial', slug: 'hydrafacial', description: 'Multi-step hydration treatment that cleanses, exfoliates, extracts, and hydrates for instant glow.', icon_name: 'droplets', image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 6, title: 'Chemical Peels', slug: 'chemical-peels', description: 'Medical-grade peels to resurface skin, reduce blemishes, and reveal a brighter, smoother complexion.', icon_name: 'flame', image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 7, title: 'Carbon Facial', slug: 'carbon-facial', description: 'Laser carbon peel treatment for deep pore cleansing, oil reduction, and skin rejuvenation.', icon_name: 'wind', image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 8, title: 'Skin Rejuvenation', slug: 'skin-rejuvenation', description: 'Comprehensive treatments to restore youthful vitality, improve texture, and revitalize dull skin.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1559599076-9c61d8e1b77c?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 9, title: 'Anti-Aging Treatments', slug: 'anti-aging-treatments', description: 'Botox, fillers, and non-surgical solutions to reduce fine lines, wrinkles, and restore youthful contours.', icon_name: 'clock', image_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80', category: 'Anti-Aging' },
  { id: 10, title: 'PRP Therapy', slug: 'prp-therapy', description: "Platelet-rich plasma therapy for skin rejuvenation and hair restoration using your body's own growth factors.", icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1626278664285-f796b9ee7806?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 11, title: 'Hair Fall Treatment', slug: 'hair-fall-treatment', description: 'Medical-grade treatments to address hair thinning and excessive hair fall with proven therapies.', icon_name: 'scissors', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 12, title: 'Hair Regrowth Treatment', slug: 'hair-regrowth-treatment', description: 'Advanced regrowth protocols combining PRP, mesotherapy, and topical treatments for denser, healthier hair.', icon_name: 'heartpulse', image_url: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 13, title: 'Laser Hair Removal', slug: 'laser-hair-removal', description: 'Safe and effective permanent hair reduction using advanced laser technology for all skin types.', icon_name: 'zap', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80', category: 'Laser' },
  { id: 14, title: 'IV Infusion Therapy', slug: 'iv-infusion-therapy', description: 'Intravenous vitamin and nutrient infusions for skin glow, immunity boost, and overall wellness.', icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80', category: 'Wellness' },
  { id: 15, title: 'MNRF Treatment', slug: 'mnrf-treatment', description: 'Microneedling Radiofrequency (MNRF) combines micro-injuries with RF energy to stimulate collagen, tighten skin, and reduce scars and pores.', icon_name: 'sparkles', image_url: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=800&q=80', category: 'Skin' },
  { id: 16, title: 'GFC Treatment', slug: 'gfc-treatment', description: 'Growth Factor Concentrate (GFC) therapy uses your own concentrated growth factors to promote hair regrowth and skin rejuvenation.', icon_name: 'syringe', image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80', category: 'Hair' },
  { id: 17, title: 'Anti Dandruff Treatment', slug: 'anti-dandruff-treatment', description: 'Targeted scalp treatments to eliminate dandruff, soothe irritation, and restore a healthy, flake-free scalp.', icon_name: 'droplets', image_url: '/images/service-antidandruff.jpg', category: 'Hair' },
];

const categories = ['All', 'Skin', 'Hair', 'Laser', 'Anti-Aging', 'Wellness'];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { openModal } = useBookNow();
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

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Signature Treatments</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Our <span className="text-[#C89B3C]">Treatments</span>
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto font-['Poppins']">
            Discover our comprehensive range of aesthetic treatments designed to enhance your natural beauty.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white shadow-lg shadow-[#C89B3C]/20'
                  : 'bg-white text-[#888] hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-5">
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((service, index) => {
              const Icon = iconMap[service.icon_name] || Sparkles;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => navigate(`/treatments/${service.slug}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#C89B3C]/10 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
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
                    <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon size={18} className="text-[#C89B3C]" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-['Playfair_Display'] text-base font-bold text-[#1a1a1a] mb-2 group-hover:text-[#C89B3C] transition-colors"><Link to={`/treatments/${service.slug}`} onClick={(e) => e.stopPropagation()}>{service.title}</Link></h3>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 font-['Poppins'] line-clamp-2">
                      {service.description}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); openModal(service.title); }}
                      className="flex items-center gap-1.5 text-[#C89B3C] text-xs font-semibold group-hover:gap-2.5 transition-all"
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
  );
}
