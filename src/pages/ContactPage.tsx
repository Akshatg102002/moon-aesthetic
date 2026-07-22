import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2,
  UserPlus, Sparkles, Stethoscope, ShieldCheck, Cpu,
  Calendar, MessageCircle
} from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

const serviceOptions = [
  'Skin Consultation',
  'Acne Treatment',
  'Acne Scar Treatment',
  'Pigmentation Treatment',
  'Hydrafacial',
  'Chemical Peels',
  'Carbon Facial',
  'Skin Rejuvenation',
  'Anti-Aging Treatments',
  'PRP Therapy',
  'Hair Fall Treatment',
  'Hair Regrowth Treatment',
  'Laser Hair Removal',
  'IV Infusion Therapy',
  'MNRF Treatment',
  'GFC Treatment',
  'Anti Dandruff Treatment',
];

const contactCards = [
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91 9113869966'],
    href: 'tel:+919113869966',
    cta: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@moonaesthetic.in'],
    href: 'mailto:info@moonaesthetic.in',
    cta: 'Send Email',
  },
  {
    icon: MapPin,
    title: 'Clinic Address',
    lines: [
      '2nd Floor, Manjaly Edifice,',
      '703, 3rd Cross Road,',
      'HRBR Layout 1st Block,',
      'Kalyan Nagar, Bengaluru – 560043, Karnataka',
    ],
    href: 'https://www.google.com/maps/search/Manjaly+Edifice+HRBR+Layout+Kalyan+Nagar+Bengaluru',
    cta: 'Get Directions',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Monday – Sunday', '10:00 AM – 7:00 PM'],
    href: '',
    cta: '',
  },
];

const whyVisit = [
  {
    icon: UserPlus,
    title: 'Personalized Consultations',
    desc: 'Every treatment begins with a one-on-one consultation tailored to your unique skin and hair concerns.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Aesthetic Treatments',
    desc: 'From Hydrafacials to PRP therapy, we offer cutting-edge treatments for every skin and hair need.',
  },
  {
    icon: Stethoscope,
    title: 'Experienced Doctors',
    desc: 'Our qualified cosmetologists, Dr. Syed Anjum and Dr. Hiba Perween, bring expert care to every procedure.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Hygienic Environment',
    desc: 'We maintain the highest clinical safety and hygiene standards across every treatment and procedure.',
  },
  {
    icon: Cpu,
    title: 'Modern Technology',
    desc: 'FDA-approved equipment and advanced technology ensure safer procedures with superior results.',
  },
];

export default function ContactPage() {
  const { openModal } = useBookNow();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.service || !form.date) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', service: '', date: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to submit appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#333]">

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/clinic-interior.jpg"
            alt="Moon Aesthetic Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/50" />
        </div>
        <div className="absolute top-20 right-16 w-72 h-72 border border-[#C89B3C]/15 rounded-full hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/20 border border-[#C89B3C]/40 rounded-full mb-8">
              <div className="w-2 h-2 bg-[#C89B3C] rounded-full animate-pulse" />
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">
                Get In Touch
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">Moon Aesthetic</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            We're here to help you begin your aesthetic journey. Book a consultation or get in touch with our team.
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-lg hover:shadow-[#C89B3C]/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#C89B3C]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#C89B3C]/20 transition-colors">
                  <card.icon size={24} className="text-[#C89B3C]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a1a] mb-3">
                  {card.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-[#666] text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
                {card.cta && card.href && (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-[#C89B3C] text-xs font-semibold tracking-wider uppercase hover:gap-2.5 transition-all"
                  >
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPOINTMENT FORM + MAP ===== */}
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
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Book Appointment</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Schedule Your <span className="text-[#C89B3C]">Visit</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto font-['Poppins']">
              Take the first step towards your transformation. Book a consultation at Moon Aesthetic today.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-[#666] mb-6 font-['Poppins']">
                    Thank you for choosing Moon Aesthetic. Our team will contact you shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-widest uppercase font-semibold rounded-full"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9113869966"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-1.5">Treatment Interested In *</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7] appearance-none"
                      >
                        <option value="">Select a treatment</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Preferred Appointment Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your concerns..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7] resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium mt-4">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Book Appointment
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0167!2d77.6352!3d13.0118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16b6e9e7e7e7%3A0x1234567890abcdef!2sHRBR%20Layout%201st%20Block%2C%20Kalyan%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560043!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Moon Aesthetic Location"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WHY VISIT ===== */}
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
              <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Why Visit Us</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
              Why Visit <span className="text-[#C89B3C]">Moon Aesthetic</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyVisit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-lg hover:shadow-[#C89B3C]/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#C89B3C]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#C89B3C]/20 transition-colors">
                  <item.icon size={24} className="text-[#C89B3C]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a1a] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed font-['Poppins']">
                  {item.desc}
                </p>
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
              Ready to Transform Your <span className="text-[#C89B3C]">Skin & Hair?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 font-['Poppins']">
              Begin your journey to radiant skin and healthy hair. Our expert team is ready to guide you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all hover:-translate-y-0.5"
              >
                <Calendar size={16} className="inline mr-2 -mt-0.5" />
                Book Appointment
              </a>
              <a
                href="tel:+919113869966"
                className="px-8 py-4 border-2 border-white/30 text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all"
              >
                <Phone size={16} className="inline mr-2 -mt-0.5" />
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
  );
}
