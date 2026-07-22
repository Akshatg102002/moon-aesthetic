import { motion } from 'framer-motion';
import { Heart, Sparkles, Target, Gem } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Patient-First Care',
    desc: 'Every treatment plan is personalized to your unique needs, ensuring compassionate and attentive care.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Technology',
    desc: 'We use FDA-approved, state-of-the-art equipment for safer procedures and superior outcomes.',
  },
  {
    icon: Target,
    title: 'Evidence-Based Practice',
    desc: 'Our protocols are grounded in dermatological science, delivering treatments that truly work.',
  },
  {
    icon: Gem,
    title: 'Premium Experience',
    desc: 'From consultation to recovery, every touchpoint reflects our commitment to luxury and excellence.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#C89B3C]/20 rounded-3xl" />
            <img
              src="/images/About_us.jpeg"
              alt="Moon Aesthetic Clinic Interior"
              className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">About Us</span>
            </div>

            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              About
              <br />
              <span className="text-[#C89B3C]">Moon Aesthetic</span>
            </h2>

            <p className="text-[#666] leading-relaxed mb-6 font-['Poppins']">
              Moon Aesthetic is a premium dermatology and aesthetic clinic located in the heart of Bengaluru.
              Founded with a vision to offer world-class skin, hair, and aesthetic treatments, our clinic
              combines advanced medical science with a luxurious patient experience.
            </p>

            <p className="text-[#666] leading-relaxed mb-10 font-['Poppins']">
              Our team of qualified cosmetologists and skin experts is dedicated to helping you achieve
              your aesthetic goals through personalized treatment plans, cutting-edge technology, and
              a compassionate approach. At Moon Aesthetic, we believe in illuminating your natural beauty
              under the moon's gentle glow.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C89B3C]/10 flex items-center justify-center">
                    <v.icon size={20} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a] mb-1">{v.title}</h4>
                    <p className="text-xs text-[#888] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
