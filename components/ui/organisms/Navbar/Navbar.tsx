"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Logo } from "../../atoms/Logo/Logo";
import metaData from "@/data/meta.json";
import useScrollPercent from "@/hooks/useScrollPercent";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigation } = metaData;
  const { scrollPx } = useScrollPercent("#scroll-container");
  const navbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Hide global navbar on full-screen 2D interactive homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <nav
      ref={navbarRef}
      className="z-[100] flex sticky top-0 border border-transparent w-full duration-300 items-center justify-between py-4 px-4 md:px-8 max-w-7xl mx-auto transition-all"
    >
      <Logo />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-12">
        {navigation.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname === link.href
                ? "text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center">
        <Link href="/contact">
          <Button variant="primary" size="sm">
            Let&apos;s talk
          </Button>
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-foreground/10 flex flex-col p-6 gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-foreground/10">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Let&apos;s talk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
