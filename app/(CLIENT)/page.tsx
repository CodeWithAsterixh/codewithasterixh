import About from "d/components/sections/About";
import Cutout from "d/components/sections/Cutout";
import Experience from "d/components/sections/Experience";
import HeroSection from "d/components/sections/Hero";
import MyTools from "d/components/sections/My_Tools";
import Services from "d/components/sections/Services";

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
    </>
  );
}
