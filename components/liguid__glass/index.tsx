"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "d/lib/utils";
import React, { cloneElement, isValidElement, useState } from "react";
import { GlassVarOptions } from "./types";
import { getGlassStructures, glassBaseClasses } from "./baseClassName";

/**
 * A polymorphic component that handles hover state internally
 * while still allowing external event handlers and props.
 */
export type LiquidGlassProps<As extends React.ElementType> = {
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
  options?:GlassVarOptions

  /**
   * clone child instead of rendering a wrapper
   */
  asChild?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<As>,
  "as" | "children" | "hoveredClass" | "asChild" | "options"|"hoverVars"
>;

/**
 * ForwardRef exotic component type for LiquidGlass
 */
type LiquidGlassComponent = <As extends React.ElementType = "div">(
  props: LiquidGlassProps<As> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;

export const LiquidGlass = React.forwardRef(function LiquidGlass<
  As extends React.ElementType = "div"
>(
  {
    as,
    asChild,
    children,
    hoveredClass,
    onMouseEnter,
    onMouseLeave,
    className,
    options,
    hoverVars,
    ...rest
  }: LiquidGlassProps<As>,
  ref?: React.Ref<Element>
) {
  const mainClass = cn(
    glassBaseClasses,
    className,
  );
  const varStyle = getGlassStructures(options)
  const Component = as || "div";
  const MainComponent = () => {
    if (asChild) {
      const child = React.Children.only(children);
      if (isValidElement(child)) {
        const typedChild = child as React.ReactElement<any>;
        return cloneElement(typedChild, {
          ref,
          className: cn(mainClass),
          style: { ...typedChild.props.style, ...varStyle },
          ...(rest as React.ComponentPropsWithoutRef<As>),
        });
      }
    }
    return (
      <Component
        ref={ref}
        className={cn(mainClass)}
        {...(rest as React.ComponentPropsWithoutRef<As>)}
        style={{...varStyle, ...rest.style}}

      >
        {children}
      </Component>
    );
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="12"
              result="blurred"
            />
            <feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="77"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <MainComponent />
    </>
  );
}) as LiquidGlassComponent;
