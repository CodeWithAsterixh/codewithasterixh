import React from "react";
import Link from "next/link";
import { siteUrl } from "@/config/site";

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="text-2xl font-semibold text-white tracking-tight hover:text-white/80 transition-colors">
      {`${siteUrl}/icon`}
    </Link>
  );
};
