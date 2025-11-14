export type PricingPlan = {
  name: string
  price: string
  duration: string
  features: string[]
  highlight: boolean
}

export type PricingSection = {
  heading: {
    small: string
    large: string
  }
  plans: PricingPlan[]
}
