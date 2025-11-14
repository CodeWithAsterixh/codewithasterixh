export type Testimonial = {
  name: string
  role: string
  feedback: string
  rating: 1 | 2 | 3 | 4 | 5
  avatar?: string // optional URL to an image
}

export type TestimonialsSection = {
  heading: string
  subheading?: string
  testimonials: Testimonial[]
}
