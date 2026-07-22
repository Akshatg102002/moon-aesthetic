import { motion } from 'framer-motion';
import { ChevronDown, Shield, Award, Clock, Users } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

const trustBadges = [
  { icon: Shield, label: 'Certified Clinic' },
  { icon: Award, label: 'Expert Doctors' },
  { icon: Users, label: 'Trusted by Thousands' },
];

export default function Hero() {
  const { openModal } = useBookNow();

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/Hero_banner.png"
          alt="Moon Aesthetic Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="absolute top-24 right-12 w-80 h-80 border border-[#C89B3C]/15 rounded-full hidden lg:block" />
      <div className="absolute bottom-24 left-12 w-56 h-56 border border-[#C89B3C]/10 rounded-full hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 border border-[#C89B3C]/40 rounded-full mb-8">
              <div className="w-2 h-2 bg-[#C89B3C] rounded-full animate-pulse" />
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">
                Premium Aesthetic Care
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Illuminate Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">
              Natural Beauty
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-['Poppins']"
          >
            Under the Moon's Gentle Glow — Experience advanced dermatological and aesthetic treatments at Moon Aesthetic, Bengaluru.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <button
              onClick={scrollToServices}
              className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all hover:-translate-y-0.5"
            >
              Explore Treatments
            </button>
            <button
              onClick={() => openModal()}
              className="px-8 py-4 border-2 border-white/30 text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all"
            >
              Book Appointment
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-white/50">
                <badge.icon size={16} className="text-[#C89B3C]" />
                <span className="text-xs tracking-wider uppercase">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-white/30" size={28} />
      </motion.div>
    </section>
  );
}
