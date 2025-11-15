"use client";
import { useIsMobile } from "d/lib/hooks/use-mobile";
import React from "react";
import MobileVersion from "./mobile";
import DesktopVersion from "./desktop";
import { dynamicIconImports } from 'lucide-react/dynamic';
import { createPortal } from "react-dom";



// navigations data with icons from lucide

export type NavigationItem = {
  name: string;
  href: string;
  icon: keyof typeof dynamicIconImports; // icon name from lucide-react
};
const navigations:NavigationItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "home",
  },
  {
    name: "About",
    href: "/#about",
    icon: "info",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: "briefcase",
  },
  {
    name: "Contact",
    href: "/#contact",
    icon: "mail",
  },
]

/**
 * Navigations component that conditionally renders mobile or desktop version
 * based on the current device type.
 */
export default function Navigations() {
  const isMobile = useIsMobile();
  
  if (isMobile) return createPortal(<MobileVersion navigations={navigations} />, document.getElementById("mobile-nav")!);
  if (!isMobile) return <DesktopVersion navigations={navigations} />;

  return null
}
