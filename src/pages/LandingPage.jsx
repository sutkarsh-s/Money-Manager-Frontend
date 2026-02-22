import { memo } from "react";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import StatsSection from "../components/StatsSection.jsx";
import SaaSHighlights from "../components/SaaSHighlights.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import HowItWorksSection from "../components/HowItWorksSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import CTASection from "../components/CTASection.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors">
    <Header />
    <main>
      <HeroSection />
      <StatsSection />
      <SaaSHighlights />
      <ProductShowcase />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default memo(LandingPage);
