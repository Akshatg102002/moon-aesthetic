import { motion } from 'framer-motion';
import { Monitor, Shield, Cpu, Zap } from 'lucide-react';

const technologies = [
  {
    icon: Cpu,
    name: 'Advanced Laser Platforms',
    desc: 'State-of-the-art laser systems for hair removal, pigmentation, and skin resurfacing treatments.',
  },
  {
    icon: Zap,
    name: 'Hydrafacial Technology',
    desc: 'Medical-grade hydration and exfoliation system for deep cleansing and instant skin rejuvenation.',
  },
  {
    icon: Monitor,
    name: 'PRP & Mesotherapy',
    desc: 'Precision delivery systems for platelet-rich plasma and mesotherapy treatments for skin and hair.',
  },
  {
    icon: Shield,
    name: 'FDA-Approved Devices',
    desc: 'All equipment meets stringent safety and efficacy standards for your peace of mind.',
  },
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Technology</span>
            </div>

            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Advanced
              <br />
              <span className="text-[#C89B3C]">Technology</span>
            </h2>

            <p className="text-[#888] leading-relaxed mb-8 font-['Poppins']">
              At Moon Aesthetic, we invest in the most advanced, FDA-approved aesthetic technology.
              Our equipment ensures safer procedures, minimal downtime, and superior results for every patient.
            </p>

            <img
              src="/images/technology.jpg"
              alt="Advanced Technology at Moon Aesthetic"
              className="w-full rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#faf9f7] border border-gray-100 rounded-2xl p-6 hover:border-[#C89B3C]/30 hover:shadow-lg hover:shadow-[#C89B3C]/5 transition-all duration-300 group"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#C89B3C]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C89B3C]/20 transition-colors">
                    <tech.icon size={24} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a1a] mb-2">
                      {tech.name}
                    </h4>
                    <p className="text-[#888] text-sm leading-relaxed font-['Poppins']">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
