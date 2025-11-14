export type EducationWorkDuration = {
  from: number
  to: number
}

export type EducationWorkItem = {
  name: string
  title: string
  duration: EducationWorkDuration
}

export type EducationWorkSection = {
  heading: {
    small: string
    large: string
  }
  education: EducationWorkItem[]
  work: EducationWorkItem[]
}
