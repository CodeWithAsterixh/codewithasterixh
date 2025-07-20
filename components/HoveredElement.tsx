"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { cloneElement, isValidElement, useState } from "react";
import clsx from "clsx";

/**
 * A polymorphic component that handles hover state internally
 * while still allowing external event handlers and props.
 */
export type HoveredElementProps<As extends React.ElementType> = {
  /**
   * Element type to render, e.g. "div" | "button" | custom component
   */
  as?: As;
  /**
   * Children to render inside the component
   */
  children?: React.ReactNode;
  /**
   * Class names to apply based on hover state
   */
  hoveredClass?: Partial<Record<'true' | 'false', string>>;

  /**
   * clone child instead of rendering a wrapper
   */
  asChild?:boolean
} & Omit<
  React.ComponentPropsWithoutRef<As>,
  'as' | 'children' | 'hoveredClass' | 'asChild'
>;

/**
 * ForwardRef exotic component type for HoveredElement
 */
type HoveredElementComponent = <
  As extends React.ElementType = 'div'
>(
  props: HoveredElementProps<As> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;

export const HoveredElement = React.forwardRef(
  function HoveredElement<As extends React.ElementType = 'div'>(
    {
      as,
      asChild,
      children,
      hoveredClass,
      onMouseEnter,
      onMouseLeave,
      className,
      ...rest
    }: HoveredElementProps<As>,
    ref?: React.Ref<Element>
  ) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = (e: React.MouseEvent<Element>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };
    const handleMouseLeave = (e: React.MouseEvent<Element>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const Component = as || 'div';

    if(asChild){
      const child = React.Children.only(children);
      if(isValidElement(child)){
        return cloneElement(child as React.ReactElement<any>, {
          ref,
          onMouseEnter:handleMouseEnter,
        onMouseLeave:handleMouseLeave,
        className:clsx(
          hoveredClass?.[String(isHovered) as 'true' | 'false'],
          className
        ),
        ...rest as React.ComponentPropsWithoutRef<As>
        })
      }
    }
    return (
      <Component
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          hoveredClass?.[String(isHovered) as 'true' | 'false'],
          className
        )}
        {...(rest as React.ComponentPropsWithoutRef<As>)}
      >
        {children}
      </Component>
    );
  }
) as HoveredElementComponent;

