import { defineType } from "sanity";

import { aboutSection } from "./aboutSchema";
import { contactSection } from "./contactSchema";
import { hero } from "./heroSchema";
import { pricingSection } from "./pricingSchema";
import { testimonialsSection } from "./testimonialsSchema";
import { educationWorkSection } from "./educationWorkSchema";
import { portfolioSection } from "./portfolioSchema";
import { servicesSection } from "./servicesSchema";
import { technologiesSection } from "./techSchema";

const schemaTypes = [
  aboutSection,
  contactSection,
  hero,
  pricingSection,
  testimonialsSection,
  educationWorkSection,
  portfolioSection,
  servicesSection,
  technologiesSection,
];

const portfolioSchema = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: schemaTypes,
  preview: {
    select: {
      title: "hero.headline",
    },
  },
});

export default portfolioSchema;
