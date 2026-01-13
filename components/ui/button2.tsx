import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "d/lib/utils";
import { HoveredElement, HoveredElementProps } from "../HoveredElement";
import { DynamicIcon, dynamicIconImports } from "lucide-react/dynamic";
import type { LucideProps } from "lucide-react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "h-9 w-9 p-2",
      },
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs focus-visible:ring-destructive/20 hover:bg-destructive/90",
        outline: "bg-background text-accent-foreground border shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary-100 text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "bg-transparent text-accent-foreground hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline bg-transparent shadow-none",
        dark: "bg-base-300 text-base-content hover:bg-base-300/300",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

type IconConfig = {
  icon_name: keyof typeof dynamicIconImports;
  props?: LucideProps & React.RefAttributes<SVGSVGElement>;
  slot_props?: HoveredElementProps<'span'>;
};

export interface Button2Props
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: IconConfig;
  iconRight?: IconConfig;
  text_class?: string;
  href?:string;
  as?:React.ElementType
}

export const Button2 = React.forwardRef<HTMLButtonElement, Button2Props>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconLeft,
      iconRight,
      text_class,
      children,
      as,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    return (
      <HoveredElement
        as={asChild ? undefined : as}
        asChild={asChild}
        data-slot="button"
        hoveredClass={{ true: '', false: '' }}
        className={classes}
        ref={ref}
        {...props}
      >
        {/* Left Icon */}
        {iconLeft && (
          <HoveredElement
            as="span"
            hoveredClass={{ true: iconLeft.slot_props?.hoveredClass?.true || '', false: iconLeft.slot_props?.hoveredClass?.false || '' }}
            className={cn('flex items-center', iconLeft.slot_props?.className)}
          >
            <DynamicIcon
              {...iconLeft.props}
              name={iconLeft.icon_name}
              className={cn('size-4', iconLeft.props?.className)}
            />
          </HoveredElement>
        )}

        {/* Text */}
        <span className={cn('inline-flex items-center', text_class)}>
          {children}
        </span>

        {/* Right Icon */}
        {iconRight && (
          <HoveredElement
            as="span"
            hoveredClass={{ true: iconRight.slot_props?.hoveredClass?.true || '', false: iconRight.slot_props?.hoveredClass?.false || '' }}
            className={cn('flex items-center', iconRight.slot_props?.className)}
          >
            <DynamicIcon
              {...iconRight.props}
              name={iconRight.icon_name}
              className={cn('size-4', iconRight.props?.className)}
            />
          </HoveredElement>
        )}
      </HoveredElement>
    );
  }
);
Button2.displayName = 'Button2';
