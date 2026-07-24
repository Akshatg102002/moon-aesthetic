import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Sparkles, Stethoscope, ShieldCheck, Cpu,
  ClipboardCheck, Heart, Sun, Eye, Droplets, Flame, Wind,
  Clock, Syringe, Scissors, HeartPulse, Zap, Award,
  GraduationCap, MessageCircle, Calendar
} from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';
import SEO from '../components/SEO';
import { pages, SITE_URL } from '../config/seo';
import { breadcrumbSchema } from '../config/schema';

const whyChoose = [
  { icon: ClipboardCheck, title: 'Personalized Treatment Plans', desc: 'Every treatment plan is tailored to your unique skin, hair, and aesthetic concerns.' },
  { icon: Stethoscope, title: 'Experienced Aesthetic Doctors', desc: 'Qualified cosmetologists with expertise in advanced aesthetic procedures.' },
  { icon: Cpu, title: 'Advanced Technology', desc: 'FDA-approved equipment and modern techniques for safer, superior results.' },
  { icon: ShieldCheck, title: 'Safe & Hygienic Clinic', desc: 'Strict clinical safety and hygiene protocols across every procedure.' },
  { icon: ClipboardCheck, title: 'Evidence-Based Procedures', desc: 'Treatments grounded in dermatological science with proven outcomes.' },
  { icon: Heart, title: 'Patient-Centric Care', desc: 'Compassionate, attentive care focused on your comfort and confidence.' },
  { icon: Sun, title: 'Natural Looking Results', desc: 'Enhancing your natural beauty — never overdone, always authentic.' },
  { icon: UserPlus, title: 'Comfortable & Professional Environment', desc: 'A premium clinic experience from consultation to recovery.' },
];

const specialties = [
  { title: 'Skin Consultation', icon: Eye },
  { title: 'Acne Treatment', icon: Droplets },
  { title: 'Acne Scar Treatment', icon: Sparkles },
  { title: 'Pigmentation Treatment', icon: Sun },
  { title: 'Hydrafacial', icon: Droplets },
  { title: 'Chemical Peels', icon: Flame },
  { title: 'Carbon Facial', icon: Wind },
  { title: 'Skin Rejuvenation', icon: Sparkles },
  { title: 'Anti-Aging Treatments', icon: Clock },
  { title: 'PRP Hair Therapy', icon: Syringe },
  { title: 'Hair Fall Treatment', icon: Scissors },
  { title: 'Hair Regrowth Treatment', icon: HeartPulse },
  { title: 'Laser Hair Removal', icon: Zap },
  { title: 'IV Infusion Therapy', icon: Syringe },
  { title: 'MNRF Treatment', icon: Sparkles },
  { title: 'GFC Treatment', icon: Syringe },
  { title: 'Anti Dandruff Treatment', icon: Droplets },
];

const doctors = [
  {
    name: 'Dr. Syed Anjum',
    qualification: 'MBBS',
    designation: 'Consultant Cosmetologist',
    image: 'https://i.ibb.co/Kp16qZ8Q/sayyed-anjum.webp',
    bio: 'Dr. Syed Anjum specializes in aesthetic medicine with expertise in skin rejuvenation, hair restoration, anti-aging procedures, laser treatments, and personalized cosmetic care. She is committed to delivering natural-looking results through safe and evidence-based treatments.',
  },
  {
    name: 'Dr. Hiba Perween',
    qualification: '',
    designation: 'Cosmetologist | Skin & Hair Expert',
    image: 'https://i.ibb.co/ynCk7ybv/Hiba.webp',
    bio: 'Dr. Hiba Perween specializes in customized skin and hair treatments, combining modern aesthetic techniques with patient-focused care to help clients achieve healthy skin and hair with natural results.',
  },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { openModal } = useBookNow();

  const page = pages.find((p) => p.slug === 'about')!;

  return (
    <>
      <SEO title={page.title} description={page.description} path={page.path} keywords={page.keywords} image={page.image} breadcrumbs={[{ name: 'Home', url: SITE_URL }, { name: page.slug === 'treatments' ? 'Treatments' : page.slug === 'about' ? 'About' : 'Contact', url: `${SITE_URL}${page.path}` }]} schema={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: page.slug === 'treatments' ? 'Treatments' : page.slug === 'about' ? 'About' : 'Contact', url: `${SITE_URL}${page.path}` }])} />
    <div className="min-h-screen bg-white font-['Poppins'] text-[#333]">

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/office.jpeg"
            alt="Moon Aesthetic Consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/40" />
        </div>
        <div className="absolute top-24 right-16 w-80 h-80 border border-[#C89B3C]/15 rounded-full hidden lg:block" />
        <div className="absolute bottom-16 left-16 w-56 h-56 border border-[#C89B3C]/10 rounded-full hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 border border-[#C89B3C]/40 rounded-full mb-8">
                  <div className="w-2 h-2 bg-[#C89B3C] rounded-full animate-pulse" />
                  <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">
                    About Us
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">Moon Aesthetic</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
              >
                At Moon Aesthetic, we believe beauty is personal. Our clinic combines advanced aesthetic treatments, modern technology, and personalized care to help every client achieve healthy skin, confident hair, and natural-looking results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                  onClick={() => openModal()}
                  className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all hover:-translate-y-0.5"
                >
                  Book Appointment
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#C89B3C]/20 rounded-3xl" />
              <img
                src="/images/About_page.jpeg"
                alt="Moon Aesthetic Clinic"
                className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
                <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Story</span>
              </div>

              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-8 leading-tight">
                The Story Behind
                <br />
                <span className="text-[#C89B3C]">Moon Aesthetic</span>
              </h2>

              <p className="text-[#666] leading-relaxed mb-6 font-['Poppins']">
                Moon Aesthetic is an advanced skin, hair, and aesthetic clinic located in Kalyan Nagar, Bengaluru. We are dedicated to providing safe, personalized, and evidence-based aesthetic treatments tailored to every individual's unique concerns and goals.
              </p>

              <p className="text-[#666] leading-relaxed font-['Poppins']">
                Our focus is on enhancing natural beauty through modern technology, professional expertise, and compassionate patient care. Every consultation begins with understanding the patient's needs before creating a customized treatment plan designed to deliver safe and long-lasting results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
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
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Purpose</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a]">
              Mission & <span className="text-[#C89B3C]">Vision</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-xl hover:shadow-[#C89B3C]/5 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-[#C89B3C]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C89B3C]/20 transition-colors">
                <Award size={28} className="text-[#C89B3C]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] mb-4">Our Mission</h3>
              <p className="text-[#666] leading-relaxed font-['Poppins']">
                To provide safe, ethical, and personalized aesthetic treatments that enhance confidence while maintaining natural beauty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-xl hover:shadow-[#C89B3C]/5 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-[#C89B3C]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C89B3C]/20 transition-colors">
                <Sparkles size={28} className="text-[#C89B3C]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] mb-4">Our Vision</h3>
              <p className="text-[#666] leading-relaxed font-['Poppins']">
                To become one of Bengaluru's most trusted destinations for advanced skin, hair, and aesthetic care through innovation, excellence, and patient satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Why Choose Us</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Why Choose <span className="text-[#C89B3C]">Moon Aesthetic</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-lg hover:shadow-[#C89B3C]/5 transition-all duration-300 group text-center"
              >
                <div className="w-14 h-14 bg-[#C89B3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C89B3C]/20 transition-colors">
                  <item.icon size={24} className="text-[#C89B3C]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-base font-bold text-[#1a1a1a] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#888] text-xs leading-relaxed font-['Poppins']">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEET OUR DOCTORS ===== */}
      <section className="py-20 sm:py-28 bg-[#faf9f7]">
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
                      <span className="text-[#C89B3C] text-xs tracking-wider uppercase font-medium">{doctor.designation}</span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{doctor.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  {doctor.qualification && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C89B3C]/10 rounded-full mb-4">
                      <GraduationCap size={14} className="text-[#C89B3C]" />
                      <span className="text-[#C89B3C] text-xs tracking-wider uppercase font-medium">{doctor.qualification}</span>
                    </div>
                  )}
                  <p className="text-[#666] text-sm leading-relaxed font-['Poppins']">{doctor.bio}</p>
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

      {/* ===== OUR SPECIALTIES ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Specialties</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Our <span className="text-[#C89B3C]">Specialties</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {specialties.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="bg-[#faf9f7] rounded-xl p-4 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-md hover:shadow-[#C89B3C]/5 transition-all duration-300 group text-center cursor-pointer"
                onClick={() => openModal()}
              >
                <div className="w-10 h-10 bg-[#C89B3C]/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C89B3C]/20 transition-colors">
                  <item.icon size={18} className="text-[#C89B3C]" />
                </div>
                <h4 className="font-['Playfair_Display'] text-sm font-bold text-[#1a1a1a] group-hover:text-[#C89B3C] transition-colors leading-tight">
                  {item.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENT PHILOSOPHY ===== */}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 rounded-full mb-6">
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Our Philosophy</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Our Treatment <span className="text-[#C89B3C]">Philosophy</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto font-['Poppins'] mb-10">
              Every patient receives a personalized consultation to understand their skin, hair, and aesthetic concerns. We recommend only suitable treatments based on individual goals, ensuring safety, transparency, and natural-looking outcomes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openModal()}
                className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all hover:-translate-y-0.5"
              >
                <Calendar size={16} className="inline mr-2 -mt-0.5" />
                Book Appointment
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-white/30 text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all"
              >
                View Treatments
              </button>
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
