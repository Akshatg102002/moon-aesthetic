import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { sendFormSubmission } from '../lib/formSubmit';

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

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM',
];

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
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
      await sendFormSubmission({
        ...form,
        formType: 'Homepage Appointment Form',
        _subject: `New Moon Aesthetic Appointment Request - ${form.service || 'General Enquiry'}`,
      });
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Email</label>
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
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Service *</label>
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">Preferred Time</label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7] appearance-none"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
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
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#faf9f7] rounded-2xl p-6">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a] mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C89B3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a1a] text-sm">Address</p>
                    <p className="text-[#888] text-sm">2nd Floor, Manjaly Edifice, 703, 3rd Cross Road, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru – 560043</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C89B3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a1a] text-sm">Phone</p>
                    <a href="tel:+919113869966" className="text-[#888] text-sm hover:text-[#C89B3C] transition-colors">+91 9113869966</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C89B3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a1a] text-sm">Email</p>
                    <a href="mailto:info@moonaesthetic.in" className="text-[#888] text-sm hover:text-[#C89B3C] transition-colors">info@moonaesthetic.in</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#C89B3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1a1a1a] text-sm">Working Hours</p>
                    <p className="text-[#888] text-sm">Mon – Sat: 10:00 AM – 7:00 PM</p>
                    <p className="text-[#888] text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2828693491356!2d77.64082377405133!3d13.017650113869045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae175f7e400f61%3A0x7089fd4c7fe94d4d!2sMoon%20Aesthetic%20-%20Skin%20and%20Hair%20Clinic!5e0!3m2!1sen!2sin!4v1784707623435!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Moon Aesthetic Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
