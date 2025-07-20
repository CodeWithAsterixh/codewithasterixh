/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { cloneElement, isValidElement } from "react";

/**
 * A polymorphic component that handles hover state internally
 * while still allowing external event handlers and props.
 */
export type PassThroughElementProps<As extends React.ElementType> = {
  /**
   * Element type to render, e.g. "div" | "button" | custom component
   */
  as?: As;
  /**
   * Children to render inside the component
   */
  children?: React.ReactNode;
  /**
   * clone child instead of rendering a wrapper
   */
  asChild?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<As>,
  "as" | "children" | "hoveredClass" | "asChild"
>;

/**
 * ForwardRef exotic component type for HoveredElement
 */
export type PassThroughElement = <As extends React.ElementType = "div">(
  props: PassThroughElementProps<As> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;

export const PassThroughElement = React.forwardRef(function HoveredElement<
  As extends React.ElementType = "div"
>(
  { as, asChild, children, ...rest }: PassThroughElementProps<As>,
  ref?: React.Ref<Element>
) {
  const Component = as || "div";

  if (asChild) {
    const child = React.Children.only(children);
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, {
        ref,
        ...(rest as React.ComponentPropsWithoutRef<As>),
      });
    }
  }
  return (
    <Component ref={ref} {...(rest as React.ComponentPropsWithoutRef<As>)}>
      {children}
    </Component>
  );
}) as PassThroughElement;
