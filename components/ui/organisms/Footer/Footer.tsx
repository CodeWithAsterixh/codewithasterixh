import React from "react";
import Link from "next/link";
import { Logo } from "../../atoms/Logo/Logo";
import metaData from "@/data/meta.json";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 flex flex-col items-center justify-center gap-8">
      <Logo />
      
      <div className="flex items-center gap-8">
        {metaData.navigation.map((link) => (
          <Link 
            key={link.label} 
            href={link.href}
            className="text-white/50 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p className="text-white/30 text-sm">
        © {new Date().getFullYear()} All rights reserved by <span className="text-primary-blue">{metaData.site.copyright}</span>
      </p>
    </footer>
  );
};
