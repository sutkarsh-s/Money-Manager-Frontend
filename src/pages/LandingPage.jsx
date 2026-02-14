import { memo } from "react";
import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => (
  <div className="min-h-screen bg-white font-sans text-gray-800">
    <Header />
    <main>
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection />
    </main>
    <Footer />
  </div>
);

export default memo(LandingPage);
