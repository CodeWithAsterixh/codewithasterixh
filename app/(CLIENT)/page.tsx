import { getSanityQuery } from "d/cms-studio/lib/getSanityQuery";
import { portfolioQuery } from "d/cms-studio/queries";
import { Portfolio as PortfolioDataType } from "d/cms-studio/types";
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

export default async function Home() {
  const homeData:PortfolioDataType = (await getSanityQuery(portfolioQuery))[0];
  return (
    <>
      <HeroSection data={homeData.hero} />
      <Cutout />
      <Services data={homeData.servicesSection} />
      <About data={homeData.about} />
      <MyTools data={homeData.technologiesSection} />
      <Cutout />
      <Experience data={homeData.educationWorkSection} />
      <Cutout />
      <Portfolio data={homeData.portfolioSection} />
      <Pricing data={homeData.pricingSection} />
      <Testimonials data={homeData.testimonialsSection} />
      <Contact data={homeData.contact} />
      <Cutout/>
    </>
  );
}
