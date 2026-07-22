import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  treatment: string;
  image_url: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ananya S.',
    rating: 5,
    review: 'I had been struggling with acne for years. Dr. Syed Anjum at Moon Aesthetic created a personalized treatment plan and the results have been incredible. My skin has never looked better!',
    treatment: 'Acne Treatment',
    image_url: '',
  },
  {
    id: 2,
    name: 'Rohan K.',
    rating: 5,
    review: 'The laser hair removal at Moon Aesthetic was virtually painless and the results are amazing. Dr. Hiba Perween explained every step and made me feel completely comfortable throughout the process.',
    treatment: 'Laser Hair Removal',
    image_url: '',
  },
  {
    id: 3,
    name: 'Meera P.',
    rating: 5,
    review: 'I visited Moon Aesthetic for pigmentation treatment and the improvement is remarkable. The clinic is beautiful, the staff is warm, and the treatments are top-notch. Highly recommend!',
    treatment: 'Pigmentation Treatment',
    image_url: '',
  },
  {
    id: 4,
    name: 'Karthik V.',
    rating: 5,
    review: 'After trying multiple clinics for hair fall, I finally found results at Moon Aesthetic. The PRP therapy combined with their hair regrowth protocol has made a visible difference. Thank you, Dr. Anjum!',
    treatment: 'Hair Fall Treatment',
    image_url: '',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(defaultTestimonials);
        }
        setLoading(false);
      })
      .catch(() => {
        setTestimonials(defaultTestimonials);
        setLoading(false);
      });
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const next = () => setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);

  const current = displayTestimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Testimonials</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            What Our <span className="text-[#C89B3C]">Patients Say</span>
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto font-['Poppins']">
            Real stories from patients who have experienced the Moon Aesthetic difference.
          </p>
        </motion.div>

        {loading ? (
          <div className="bg-[#faf9f7] rounded-3xl p-8 max-w-3xl mx-auto animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ) : (
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-[#faf9f7] rounded-3xl p-8 sm:p-12 shadow-sm">
              <Quote size={48} className="text-[#C89B3C]/20 mb-6" />

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#C89B3C] fill-[#C89B3C]" />
                  ))}
                </div>

                <p className="text-[#555] text-lg leading-relaxed mb-8 font-['Poppins'] italic">
                  "{current.review}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C89B3C] to-[#E8C860] flex items-center justify-center text-white font-bold text-lg">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">{current.name}</p>
                    <p className="text-xs text-[#C89B3C] tracking-wider uppercase">{current.treatment}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-[#C89B3C]/30 flex items-center justify-center hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] text-[#C89B3C] transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {displayTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === currentIndex ? 'bg-[#C89B3C] w-8' : 'bg-[#C89B3C]/30 w-2.5'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border-2 border-[#C89B3C]/30 flex items-center justify-center hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] text-[#C89B3C] transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
