import { cn } from 'd/lib/utils'
import React from 'react'

export type cowlickProps = {
  variant?: keyof typeof variants
  itemClassName?: string
  size?: string
  className?:string
}

const baseClass =
  "inline-block rounded-full bg-white transition-all scale-y-200 duration-300"

const variants = {
  three: {
    items: [
      "translate-y-1 translate-x-1 -rotate-45",
      "",
      "translate-y-1 -translate-x-1 rotate-45"
    ]
  },
  cross: {
    items: [
      "-translate-x-1 -rotate-90",
      "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5",
      "translate-x-1 rotate-90",
      "absolute top-0 left-1/2 -translate-x-1/2 translate-y-2.5"
    ]
  }
}

export default function Cowlick({
  variant = "three",
  itemClassName = "",
  size = "w-2 h-2",
  className
}: cowlickProps) {
  const variantClasses = variants[variant] || variants.cross
  return (
    <span className={cn("w-fit relative duration-300 flex gap-2 pointer-events-none", className)}>
      {variantClasses.items.map((modifiers, index) => (
        <span
          key={index}
          className={cn(
            "duration-300",
            baseClass,
            size,
            modifiers,
            itemClassName
          )}
        />
      ))}
    </span>
  )
}