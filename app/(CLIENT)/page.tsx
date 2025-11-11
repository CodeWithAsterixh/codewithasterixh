import About from "d/components/sections/About";
import Contact from "d/components/sections/Contact";
import Cutout from "d/components/sections/Cutout";
import Experience from "d/components/sections/Experience";
import HeroSection from "d/components/sections/Hero";
import MyTools from "d/components/sections/My_Tools";
import Portfolio from "d/components/sections/Portfolio";
import Pricing from "d/components/sections/Pricing";
import Services from "d/components/sections/Services";
import Testimonials from "d/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Cutout />
      <Services />
      <About />
      <MyTools />
      <Cutout />
      <Experience />
      <Cutout />
      <Portfolio/>
      <Pricing/>
      <Testimonials/>
      <Contact/>
      <Cutout />
    </>
  );
}
