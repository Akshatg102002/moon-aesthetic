import { Calendar, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useBookNow } from '../contexts/BookNowContext';

export default function StickyButtons() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { openModal } = useBookNow();

  return (
    <>
      {/* Sticky Book Appointment Button - Bottom Center (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-xs tracking-[0.15em] uppercase font-bold rounded-full shadow-2xl shadow-[#C89B3C]/30 flex items-center gap-2"
        >
          <Calendar size={16} />
          Book Appointment
        </button>
      </div>

      {/* WhatsApp Button - Bottom Right */}
      <a
        href="https://wa.me/919113869966?text=Hi%20Moon%20Aesthetic%2C%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>

      {/* Desktop Sticky Book Button - Right Side */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => openModal()}
          className="px-4 py-6 bg-gradient-to-b from-[#C89B3C] to-[#E8C860] text-white text-xs tracking-[0.15em] uppercase font-bold rounded-l-xl shadow-lg hover:shadow-xl transition-all"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Book Appointment
        </button>
      </div>
    </>
  );
}
