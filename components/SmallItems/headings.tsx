import React, { Fragment } from "react";
import { HoveredElement } from "../HoveredElement";
import { PassThroughElement } from "../PassThroughElement";
import { cn } from "d/lib/utils";
import Cowlick, { cowlickProps } from "./cowlick";

type Props = {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  asChild?: boolean;
};

export function Headline({ as, asChild, children, className }: Props) {
  const asSlot = as || "h4";
  return (
    <PassThroughElement
      asChild={asChild}
      as={asSlot}
      className={cn(
        "relative flex gap-2 items-center justify-center text-3xl font-bold",
        "before:relative before:content-[''] before:w-8 before:h-[3px] before:rounded-full",
        " before:bg-primary before:top-1/2 before:left-0 before:-translate-y-1/2",
        className
      )}
    >
      {children}
    </PassThroughElement>
  );
}

type headingProps = {
  texts: { type: "even" | "odd"; text?: string }[];
  extendedClasses?: {
    even?: string;
    odd?: string;
  };
  cowlick?:cowlickProps
};
export function Heading({
  as,
  asChild,
  className,
  texts,
  extendedClasses,
  cowlick
}: Props & headingProps) {
  const asSlot = as || "h1";
  return (
    <PassThroughElement
      asChild={asChild}
      as={asSlot}
      className={cn(
        "relative flex gap-4 items-center justify-center text-3xl font-bold",
        extendedClasses?.even,
        className
      )}
    >
      {texts.map((item, index) => {
        const isOdd = item.type === "odd";
        if (isOdd)
          return (
            <em key={index} className={cn("text-primary not-italic mt-2 font-bitcount", extendedClasses?.odd)}>
              {item.text}
            </em>
          );
        return <Fragment key={index}>{item.text}</Fragment>;
      })}
      <Cowlick variant="three" {...cowlick} itemClassName={cn("!bg-base-content", cowlick?.itemClassName)} className={cn("absolute top-3 -right-10 rotate-45", cowlick?.className)}/>
    </PassThroughElement>
  );
}
