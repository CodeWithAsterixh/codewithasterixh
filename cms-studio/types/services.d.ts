export type ServiceItem = {
  index: number
  label: string
  description: string
  tags: string[]
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
}

export type ServicesSection = {
  heading: {
    small: string
    large: string
  }
  intro: string
  items: ServiceItem[]
}
