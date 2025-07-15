import HeroSection from "@/sections/HeroSection";
import ServiceSection from "@/sections/ServiceSection";
import AboutSection from "@/sections/AboutSection";
import CallToAction from "@/sections/CallToActionSection";
import FooterSection from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FooterSection />
    </>
  );
}
