import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';

const sectionLinks = [
  { label: 'Home', href: '#home' },
];

const pageLinks = [
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { openModal } = useBookNow();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isHome && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location, isHome]);

  const handleSectionClick = (href: string) => {
    setIsOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + href);
    }
  };

  const textDark = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${textDark
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://i.ibb.co/JjPfGgCc/moon-aesthetic-logo.png"
              alt="Moon Aesthetic"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {sectionLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleSectionClick(link.href)}
                className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:text-[#C89B3C] ${textDark ? 'text-[#333]' : 'text-white/90'
                  }`}
              >
                {link.label}
              </button>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:text-[#C89B3C] ${location.pathname === link.to ? 'text-[#C89B3C]' : textDark ? 'text-[#333]' : 'text-white/90'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setIsOpen(false); openModal(); }}
              className="ml-3 px-6 py-2.5 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-full hover:shadow-lg hover:shadow-[#C89B3C]/30 transition-all"
            >
              Book Appointment
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <a href="tel:+919113869966" className={`p-2 rounded-full ${textDark ? 'text-[#C89B3C]' : 'text-white'}`}>
              <Phone size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${textDark ? 'text-[#1a1a1a]' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-white !bg-white z-[9999] transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <Link
            to="/"
            className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a] tracking-wider"
            onClick={() => setIsOpen(false)}
          >
            MOON Aesthetic
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-[#1a1a1a]"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col p-6 gap-1 bg-white min-h-screen">
          {sectionLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleSectionClick(link.href)}
              className="text-left py-3 px-4 text-[#333] text-sm tracking-wider uppercase font-medium hover:text-[#C89B3C] hover:bg-[#C89B3C]/5 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}

          {pageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`text-left py-3 px-4 text-sm tracking-wider uppercase font-medium rounded-lg transition-all ${location.pathname === link.to
                  ? "text-[#C89B3C] bg-[#C89B3C]/5"
                  : "text-[#333] hover:text-[#C89B3C] hover:bg-[#C89B3C]/5"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              openModal();
            }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#C89B3C] to-[#E8C860] text-white text-sm tracking-widest uppercase font-semibold rounded-full"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
