import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { FeaturedSection } from './components/menu/FeaturedSection';
import { ProductViewer360 } from './components/viewer360/ProductViewer360';
import { CategoryNavigation } from './components/menu/CategoryNavigation';
import { DishesGrid } from './components/menu/DishesGrid';
import { BeveragesSection } from './components/menu/BeveragesSection';
import { AboutSection } from './components/brand/AboutSection';
import { TestimonialsSection } from './components/brand/TestimonialsSection';
import { InstagramGallery } from './components/brand/InstagramGallery';
import { LocationSection } from './components/brand/LocationSection';
import { FinalCTA } from './components/brand/FinalCTA';
import { Footer } from './components/layout/Footer';
import { FloatingOrderBar } from './components/layout/FloatingOrderBar';
import { ProductModal } from './components/ordering/ProductModal';
import { CartDrawer } from './components/ordering/CartDrawer';
import { CheckoutModal } from './components/ordering/CheckoutModal';

export const AppContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('destaques');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#fdfbf7] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* 1. Header with Sticky Navigation & Cart Trigger */}
      <Header />

      <main className="flex-1">
        {/* 2. Cinematic Hero Section */}
        <HeroSection />

        {/* 3. Featured / Most Ordered Products */}
        <FeaturedSection />

        {/* 4. Interactive 360° Product Experience */}
        <ProductViewer360 />

        {/* 5. Sticky Category Navigation Bar */}
        <CategoryNavigation
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 6, 7, 8. Meat Dishes, Chicken Dishes, and Portions */}
        <DishesGrid />

        {/* 9. Beverages Section */}
        <BeveragesSection />

        {/* 10. About the Restaurant */}
        <AboutSection />

        {/* 13. Testimonials (Safe Architecture) */}
        <TestimonialsSection />

        {/* 14. Instagram Feed Section */}
        <InstagramGallery />

        {/* 15. Location / Google Maps Section */}
        <LocationSection />

        {/* 16. Final Conversion CTA */}
        <FinalCTA />
      </main>

      {/* 17. Footer */}
      <Footer />

      {/* 18. Persistent WhatsApp Ordering Action */}
      <FloatingOrderBar />

      {/* Interactive Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
