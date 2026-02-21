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
  const pathname = usePathname()
  useEffect(() => {
    if (scrollPx > 40) {
      navbarRef.current?.classList.add(
        "w-[90%]!",
        "md:w-[80%]!",
        "top-2",
        "bg-background/30",
        "backdrop-blur-md",
        "rounded-full",
        "border-foreground/20!",
      );
    }else {
      navbarRef.current?.classList.remove(
        "w-[90%]!",
        "md:w-[80%]!",
        "top-2",
        "bg-background/30",
        "backdrop-blur-md",
        "rounded-full",
        "border-foreground/20!",
      );
    }
  }, [scrollPx]);

  return (
    <nav
      ref={navbarRef}
      className="z-10 flex sticky top-0 border border-transparent w-full duration-300 items-center justify-between py-4 px-4 md:px-8 max-w-7xl mx-auto"
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

      <div className="hidden md:flex">
        <Link className="size-fit" href="contact">
          <Button
            variant="primary"
            size="sm"
            className="bg-accent hover:bg-white hover:text-black"
          >
            Let&apos;s talk
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-background z-50 p-4 border-b border-white/10 md:hidden flex flex-col gap-4 shadow-2xl">
          {navigation.map((link) => (
            <div key={link.label} onClick={() => setIsOpen(false)}>
              <Link
                href={link.href}
                className="text-white/70 hover:text-white py-2 block"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div onClick={() => setIsOpen(false)}>
            <Link href="/contact">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center"
              >
                Let&apos;s talk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
