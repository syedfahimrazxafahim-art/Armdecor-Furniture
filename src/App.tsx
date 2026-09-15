import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { FurnitureSection } from './components/FurnitureSection';
import { EditorialGallery } from './components/EditorialGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FurnitureItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedInquiryItem, setSelectedInquiryItem] = useState<FurnitureItem | null>(null);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<FurnitureItem | null>(null);

  // Smooth navigation scroll handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'furniture', 'gallery', 'why-armdecor', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Map why-armdecor and reviews to appropriate nav or keep current
            if (sectionId === 'why-armdecor' || sectionId === 'reviews') {
              setActiveSection('furniture');
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProductForInquiry = (item: FurnitureItem) => {
    setSelectedInquiryItem(item);
    scrollToSection('contact');
  };

  const handleOpenQuickView = (item: FurnitureItem) => {
    setSelectedLightboxItem(item);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F1E8] dark:bg-[#16120E] text-[#1F1F1F] dark:text-[#EDE6D8] transition-colors duration-400">
        
        {/* Sticky Header with Centered Logo and Navigation */}
        <Header activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Main Content Sections in Default Order */}
        <main className="flex-grow">
          {/* 1. Hero Section */}
          <Hero
            onExplore={() => scrollToSection('furniture')}
            onContact={() => scrollToSection('contact')}
          />

          {/* 2. About Section */}
          <AboutSection onExploreFurniture={() => scrollToSection('furniture')} />

          {/* 3. Furniture Collection Section */}
          <FurnitureSection
            onSelectProductForInquiry={handleSelectProductForInquiry}
            onOpenQuickView={handleOpenQuickView}
          />

          {/* Gallery Section (Contains all 17 website images preserved without cropping) */}
          <EditorialGallery
            onInquireItem={handleSelectProductForInquiry}
            selectedLightboxItem={selectedLightboxItem}
            setSelectedLightboxItem={setSelectedLightboxItem}
          />

          {/* 4. Why Choose Us */}
          <WhyChooseUs />

          {/* 5. Reviews / Testimonials */}
          <ReviewsSection />

          {/* 6. Contact & Inquiry Section */}
          <ContactSection
            preselectedItemTitle={selectedInquiryItem ? selectedInquiryItem.title : undefined}
          />
        </main>

        {/* 7. Footer */}
        <Footer onNavigate={scrollToSection} />

      </div>
    </ThemeProvider>
  );
}
