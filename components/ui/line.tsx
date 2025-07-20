import { cn } from 'd/lib/utils'
import React from 'react'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export default function Line({className,...props}: Props) {
  return (
    <span {...props} className={cn("w-full h-[2px] bg-accent rounded-full",className)}/>
  )
}