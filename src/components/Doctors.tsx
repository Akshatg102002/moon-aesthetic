import { motion } from 'framer-motion';
import { Award, GraduationCap, Stethoscope } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

const doctors = [
  {
    name: 'Dr. Syed Anjum',
    qualification: 'MBBS, Consultant Cosmetologist',
    image: 'https://i.ibb.co/Kp16qZ8Q/sayyed-anjum.webp',
    bio: 'Dr. Syed Anjum is a qualified MBBS physician and Consultant Cosmetologist with extensive experience in aesthetic medicine. With a deep understanding of skin science and cosmetic procedures, Dr. Anjum provides personalized treatment plans that deliver natural, beautiful results for every patient.',
  },
  {
    name: 'Dr. Hiba Perween',
    qualification: 'Cosmetologist, Skin & Hair Expert',
    image: 'https://i.ibb.co/ynCk7ybv/Hiba.webp',
    bio: 'Dr. Hiba Perween is a specialist cosmetologist with expertise in advanced skin and hair treatments. Known for her meticulous approach and patient-centric philosophy, Dr. Perween combines the latest techniques with compassionate care to help patients achieve their aesthetic goals.',
  },
];

export default function Doctors() {
  const { openModal } = useBookNow();

  return (
    <section id="doctors" className="py-24 sm:py-32 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Doctors</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Meet Our <span className="text-[#C89B3C]">Doctors</span>
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto font-['Poppins']">
            Our team of qualified professionals is dedicated to helping you look and feel your best.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#C89B3C]/10 transition-all duration-500"
            >
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#C89B3C] rounded-lg flex items-center justify-center">
                      <GraduationCap size={16} className="text-white" />
                    </div>
                    <span className="text-[#C89B3C] text-xs tracking-wider uppercase font-medium">{doctor.qualification}</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{doctor.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#666] text-sm leading-relaxed font-['Poppins']">{doctor.bio}</p>
                <div className="flex items-center gap-4 mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-[#C89B3C]" />
                    <span className="text-xs text-[#888]">Certified Professional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope size={14} className="text-[#C89B3C]" />
                    <span className="text-xs text-[#888]">Aesthetic Specialist</span>
                  </div>
                </div>
                <button
                  onClick={() => openModal()}
                  className="mt-5 w-full py-3 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
