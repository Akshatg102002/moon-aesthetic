import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

const quickLinks = [
  { label: 'Home', href: '#home' },
];

const pageLinks = [
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Contact', to: '/contact' },
];

const treatments = [
  'Skin Consultation',
  'Acne Treatment',
  'Hydrafacial',
  'Chemical Peels',
  'Anti-Aging Treatments',
  'Laser Hair Removal',
  'PRP Therapy',
  'Hair Regrowth Treatment',
];

export default function Footer() {
  const navigate = useNavigate();
  const { openModal } = useBookNow();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSectionClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#C89B3C] to-[#E8C860]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-white">
              Illuminate Your Natural Beauty
            </h3>
            <p className="text-white/80 mt-1 font-['Poppins']">Book your consultation at Moon Aesthetic today.</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-8 py-3.5 bg-white text-[#C89B3C] text-sm tracking-[0.15em] uppercase font-bold rounded-full hover:shadow-xl transition-all flex-shrink-0"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div>
                <img
                  src="https://i.ibb.co/JjPfGgCc/moon-aesthetic-logo.png"
                  alt="Moon Aesthetic"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 font-['Poppins']">
              Illuminate Your Natural Beauty Under the Moon's Gentle Glow. Premium dermatology and aesthetic clinic in Bengaluru.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/moonaesthetic.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#C89B3C] transition-colors"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/people/Moon-Aesthetic/61580223223527/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#C89B3C] transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleSectionClick(link.href)}
                    className="text-white/50 hover:text-[#C89B3C] text-sm transition-colors font-['Poppins']"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-[#C89B3C] text-sm transition-colors font-['Poppins']"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold mb-6">Treatments</h4>
            <ul className="space-y-3">
              {treatments.map((s) => (
                <li key={s}>
                  <Link
                    to="/treatments"
                    className="text-white/50 hover:text-[#C89B3C] text-sm transition-colors font-['Poppins']"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm">2nd Floor, Manjaly Edifice, 703, 3rd Cross Road, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru – 560043</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-[#C89B3C] flex-shrink-0" />
                <a href="tel:+919113869966" className="text-white/50 text-sm hover:text-[#C89B3C] transition-colors">+91 9113869966</a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-[#C89B3C] flex-shrink-0" />
                <a href="mailto:info@moonaesthetic.in" className="text-white/50 text-sm hover:text-[#C89B3C] transition-colors">info@moonaesthetic.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-['Poppins']">
            © {new Date().getFullYear()} Moon Aesthetic. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://optimantix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#C89B3C] text-xs font-['Poppins'] transition-colors"
            >
              Designed &amp; Developed by Optimantix Global Pvt. Ltd.
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#C89B3C] hover:border-[#C89B3C] transition-all"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
