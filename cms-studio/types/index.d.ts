/*
FILE: types/pricing.d.ts
*/
export interface CTA {
  label: string
  href: string
}

export interface PlanItem {
  name: string
  price: string
  frequency: string
  features: string[]
  cta?: CTA
}

export interface PricingType {
  heading: string
  plans: PlanItem[]
}

/*
FILE: types/testimonials.d.ts
*/
export interface TestimonialPhoto {
  asset: { _ref: string }
}

export interface TestimonialItem {
  name: string
  role?: string
  photo?: TestimonialPhoto
  quote?: string
  rating?: number
}

export interface TestimonialsType {
  heading: string
  items: TestimonialItem[]
}

/*
FILE: types/contact.d.ts
*/
export interface FormField {
  label: string
  name: string
  type: string
}

export interface ContactType {
  heading: string
  subheading?: string
  formFields: FormField[]
  email?: string
  phone?: string
}

/*
FILE: types/hero.d.ts
*/
export interface CTAButton {
  label: string
  href: string
}

export interface HeroType {
  title: string
  subtitle?: string
  intro?: string
  avatar?: { asset: { _ref: string } }
  badges?: string[]
  primaryCta?: CTAButton
  secondaryCta?: CTAButton
}

/*
FILE: types/technologies.d.ts
*/
export interface TechnologyItem {
  name: string
  icon?: { asset: { _ref: string } }
  proficiency?: number
}

export interface TechnologiesSectionType {
  heading: string
  items: TechnologyItem[]
}

/*
FILE: types/educationWork.d.ts
*/
export interface EducationItem {
  institution: string
  degree: string
  from: string
  to: string
}

export interface WorkItem {
  role: string
  company: string
  from: string
  to: string
  description?: string
}

export interface EducationWorkType {
  heading: string
  education: EducationItem[]
  work: WorkItem[]
}

/*
FILE: types/portfolio.d.ts
*/
export interface ProjectItem {
  title: string
  description?: string
  coverImage?: { asset: { _ref: string } }
  slug?: { current: string }
}

export interface PortfolioType {
  heading: string
  intro?: string
  projects: ProjectItem[]
}
