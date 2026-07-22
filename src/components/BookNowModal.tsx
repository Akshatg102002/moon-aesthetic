import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Calendar, Phone, User } from 'lucide-react';
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

export default function BookNowModal() {
  const { isOpen, closeModal, prefillService } = useBookNow();
  const [form, setForm] = useState({ name: '', phone: '', date: '', service: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefillService) {
      setForm(prev => ({ ...prev, service: prefillService }));
    }
  }, [prefillService]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !form.date) {
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
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setForm({ name: '', phone: '', date: '', service: '' });
      setSuccess(false);
      setError('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C89B3C] to-[#E8C860] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-white">
                    Book Appointment
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5 font-['Poppins']">
                    Moon Aesthetic — Quick Booking
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-6">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a] mb-2">
                    Appointment Requested!
                  </h4>
                  <p className="text-[#666] text-sm mb-6 font-['Poppins']">
                    Thank you for choosing Moon Aesthetic. Our team will contact you shortly to confirm.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-xs tracking-widest uppercase font-semibold rounded-full"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      <User size={14} className="inline mr-1 -mt-0.5 text-[#C89B3C]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      <Phone size={14} className="inline mr-1 -mt-0.5 text-[#C89B3C]" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 9113869966"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      Treatment
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7] appearance-none"
                    >
                      <option value="">Select treatment (optional)</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1.5">
                      <Calendar size={14} className="inline mr-1 -mt-0.5 text-[#C89B3C]" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 outline-none transition-all text-sm font-['Poppins'] bg-[#faf9f7]"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Book Appointment
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-[#aaa] font-['Poppins']">
                    By booking, you agree to be contacted by Moon Aesthetic.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
