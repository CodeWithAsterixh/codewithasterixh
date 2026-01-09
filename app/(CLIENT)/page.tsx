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
import { Metadata } from "next";
import imageUrlBuilder from "d/lib/imageUrlBuilder";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const homeData: PortfolioDataType = (await getSanityQuery(portfolioQuery))[0];

  if (!homeData?.meta) return {};

  const ogImageUrl = homeData.meta.ogImage?._type
    ? imageUrlBuilder([homeData.meta.ogImage], { width: 1200, height: 630, quality: 90 })[0]
    : null;
  const twitterImageUrl = homeData.meta.twitterImage?._type
    ? imageUrlBuilder([homeData.meta.twitterImage], { width: 1200, height: 600, quality: 90 })[0]
    : null;

  return {
    title: homeData.meta.title,
    description: homeData.meta.description,
    keywords: homeData.meta.keywords,
    alternates: {
      canonical: homeData.meta.canonicalUrl,
    },
    robots: homeData.meta.robots,
    openGraph: {
      title: homeData.meta.ogTitle,
      description: homeData.meta.ogDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: homeData.meta.twitterTitle,
      description: homeData.meta.twitterDescription,
      images: twitterImageUrl ? [twitterImageUrl] : [],
    },
  };
}

export default async function Home() {
  const homeData: PortfolioDataType = (await getSanityQuery(portfolioQuery))[0];
  return (
    <>
      {/* Inject structured data */}
      {homeData?.meta?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: homeData.meta.structuredData }}
        />
      )}
      <HeroSection data={homeData.hero} />
      <Cutout />
      <Services data={homeData.servicesSection} />
      <About data={homeData.about} />
      <MyTools data={homeData.technologiesSection} />
      <Cutout />
      <Experience data={homeData.educationWorkSection} />
      <Cutout />
      <Portfolio data={homeData.portfolioSection} />
      {/*<Pricing data={homeData.pricingSection} />*/}
      <Testimonials data={homeData.testimonialsSection} />
      <Suspense fallback={<div>Loading Contact Section...</div>}>
        <Contact data={homeData.contact} />
      </Suspense>
      <Cutout/>
    </>
  );
}
