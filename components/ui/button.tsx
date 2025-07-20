import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "d/lib/utils";
import { HoveredElement } from "../HoveredElement";
const variants ={
        default:
          {
            hovered:"bg-primary/90",
            notHovered:"bg-primary",
            base:"text-primary-foreground shadow-xs"
          },
        destructive:
        {
            hovered:"bg-destructive/90",
            notHovered:"bg-destructive",
            base:"text-white shadow-xs focus-visible:ring-destructive/20"
          }
          ,
        outline:
         {
            hovered:"text-accent-foreground bg-accent",
            notHovered:"bg-background",
            base:"border shadow-xs"
          },
          
         secondary: {
          hovered: "bg-secondary/80",
          notHovered: "bg-secondary/100",
          base: "text-secondary-foreground shadow-xs"
        },
        ghost: {
          hovered: "bg-accent text-accent-foreground dark:bg-accent/50",
          notHovered: "",
          base: ""
        },
        link: {
          hovered: "underline",
          notHovered: "",
          base: "text-primary underline-offset-4"
        },
        dark: {
          hovered: "bg-base-200/100",
          notHovered: "bg-base-100/100",
          base: "text-base-content"
        }
      }
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  as = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    variant?: keyof typeof variants;
    as?:React.ElementType

  }) {
  const variantClass = variants[variant || "default"];
  const generalClass = cn(buttonVariants({ size, className }),variantClass.base)

  return (
    <HoveredElement
      as={!asChild?as:undefined}
      asChild={asChild}
      data-slot="button"
      hoveredClass={{
        true:variantClass.hovered,
        false:variantClass.notHovered
      }}
      className={generalClass}
      {...props}
    />
  );
}

export { Button, buttonVariants };
