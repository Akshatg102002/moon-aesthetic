import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useBookNow } from '../contexts/BookNowContext';
import { treatments } from '../config/seo';

const sectionLinks = [
  { label: 'Home', href: '#home' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
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
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:text-[#C89B3C] ${location.pathname === '/about' ? 'text-[#C89B3C]' : textDark ? 'text-[#333]' : 'text-white/90'
                }`}
            >
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
            >
              <Link
                to="/treatments"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:text-[#C89B3C] ${location.pathname.startsWith('/treatments') ? 'text-[#C89B3C]' : textDark ? 'text-[#333]' : 'text-white/90'
                  }`}
              >
                Treatments
                <ChevronDown size={12} className={`transition-transform duration-300 ${treatmentsOpen ? 'rotate-180' : ''}`} />
              </Link>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${treatmentsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
              >
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[240px] max-h-[70vh] overflow-y-auto">
                  {treatments.map((t) => (
                    <Link
                      key={t.slug}
                      to={`/treatments/${t.slug}`}
                      onClick={() => { setIsOpen(false); setTreatmentsOpen(false); }}
                      className="block px-4 py-2 text-[11px] tracking-wide uppercase font-medium text-[#333] hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] transition-colors"
                    >
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:text-[#C89B3C] ${location.pathname === '/contact' ? 'text-[#C89B3C]' : textDark ? 'text-[#333]' : 'text-white/90'
                }`}
            >
              Contact
            </Link>
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

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`text-left py-3 px-4 text-sm tracking-wider uppercase font-medium rounded-lg transition-all ${location.pathname === '/about'
                ? "text-[#C89B3C] bg-[#C89B3C]/5"
                : "text-[#333] hover:text-[#C89B3C] hover:bg-[#C89B3C]/5"
              }`}
          >
            About
          </Link>

          <div>
            <div
              className={`flex items-center justify-between py-3 px-4 text-sm tracking-wider uppercase font-medium rounded-lg transition-all cursor-pointer ${location.pathname.startsWith('/treatments')
                  ? "text-[#C89B3C] bg-[#C89B3C]/5"
                  : "text-[#333] hover:text-[#C89B3C] hover:bg-[#C89B3C]/5"
                }`}
            >
              <Link to="/treatments" onClick={() => setIsOpen(false)} className="flex-1">
                Treatments
              </Link>
              <button
                onClick={() => setMobileTreatmentsOpen((v) => !v)}
                aria-label="Toggle treatments menu"
                className="p-1"
              >
                <ChevronDown size={16} className={`transition-transform duration-300 ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${mobileTreatmentsOpen ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0'}`}>
              {treatments.map((t) => (
                <Link
                  key={t.slug}
                  to={`/treatments/${t.slug}`}
                  onClick={() => { setIsOpen(false); setMobileTreatmentsOpen(false); }}
                  className="block py-2.5 pl-8 pr-4 text-xs tracking-wider uppercase font-medium text-[#666] hover:text-[#C89B3C] hover:bg-[#C89B3C]/5 rounded-lg transition-all"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`text-left py-3 px-4 text-sm tracking-wider uppercase font-medium rounded-lg transition-all ${location.pathname === '/contact'
                ? "text-[#C89B3C] bg-[#C89B3C]/5"
                : "text-[#333] hover:text-[#C89B3C] hover:bg-[#C89B3C]/5"
              }`}
          >
            Contact
          </Link>

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
