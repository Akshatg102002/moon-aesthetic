import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookNowProvider } from './contexts/BookNowContext';
import BookNowModal from './components/BookNowModal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Doctors from './components/Doctors';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import StickyButtons from './components/StickyButtons';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TreatmentsPage from './pages/TreatmentsPage';
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import SEO from './components/SEO';
import JsonLd from './components/JsonLd';
import { pages } from './config/seo';
import { medicalClinicSchema, organizationSchema, websiteSchema } from './config/schema';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  const page = pages[0];
  return (
    <>
      <SEO title={page.title} description={page.description} path={page.path} keywords={page.keywords} image={page.image} />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Doctors />
      <Certifications />
      <Testimonials />
      <FAQ />
      <AppointmentForm />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BookNowProvider>
        <div className="min-h-screen bg-white font-['Poppins'] text-[#333]">
          <ScrollToTop />
          <JsonLd data={[organizationSchema, websiteSchema, medicalClinicSchema]} />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
          <StickyButtons />
          <BookNowModal />
        </div>
      </BookNowProvider>
    </BrowserRouter>
  );
}

export default App;
