export type Project = {
  title: string
  excerpt: string
  thumbnail: {
    asset: {
      url: string
    }
  }
  url: string
  tools: string[]
  tags: string[]
}

export type PortfolioSection = {
  heading: {
    small: string
    large: string
  }
  description: string
  projects: Project[]
}
