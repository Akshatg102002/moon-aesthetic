import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    id: 1,
    question: 'Is laser hair removal safe for all skin types?',
    answer: 'Yes, at Moon Aesthetic we use advanced laser technology that is safe and effective for all skin types. Our doctors will assess your skin during the consultation to customize the treatment parameters for optimal safety and results.',
  },
  {
    id: 2,
    question: 'How many sessions are needed for acne treatment?',
    answer: 'The number of sessions depends on the severity of your acne and your skin type. Mild to moderate acne may show improvement in 4-6 sessions, while more severe cases may require additional treatments. Dr. Syed Anjum will create a personalized plan during your consultation.',
  },
  {
    id: 3,
    question: 'What is the downtime after a chemical peel?',
    answer: 'Downtime depends on the depth of the peel. Light peels have minimal to no downtime with slight redness for a few hours. Medium peels may require 3-5 days of recovery. We will recommend the appropriate peel strength based on your skin condition and schedule.',
  },
  {
    id: 4,
    question: 'Are the treatments painful?',
    answer: 'Most of our treatments involve minimal discomfort. We use advanced technology with built-in cooling systems, and we apply topical anesthetics when needed. Our patients consistently report that treatments are much more comfortable than expected.',
  },
  {
    id: 5,
    question: 'How does PRP therapy work for hair regrowth?',
    answer: 'PRP (Platelet-Rich Plasma) therapy uses your own blood plasma, rich in growth factors, which is injected into the scalp to stimulate hair follicles, promote new hair growth, and strengthen existing hair. It is a safe and natural treatment with proven results.',
  },
  {
    id: 6,
    question: 'How can I book an appointment?',
    answer: 'You can book an appointment by calling us at +91 9113869966, emailing info@moonaesthetic.in, or filling out the appointment form on this page. Our team will get back to you to confirm your preferred date and time.',
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(1);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(defaultFAQs);
        }
        setLoading(false);
      })
      .catch(() => {
        setFaqs(defaultFAQs);
        setLoading(false);
      });
  }, []);

  const displayFaqs = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#faf9f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">FAQ</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Common <span className="text-[#C89B3C]">Questions</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {displayFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  openId === faq.id
                    ? 'border-[#C89B3C]/30 bg-[#C89B3C]/5'
                    : 'border-gray-100 bg-white hover:border-[#C89B3C]/20'
                }`}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-['Playfair_Display'] text-base sm:text-lg font-semibold text-[#1a1a1a] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-[#C89B3C] transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#666] leading-relaxed font-['Poppins'] text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
