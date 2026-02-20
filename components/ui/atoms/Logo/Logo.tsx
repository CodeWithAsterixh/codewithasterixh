import React from "react";
import Link from "next/link";
import metaData from "@/data/meta.json";

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="text-2xl font-semibold text-white tracking-tight hover:text-white/80 transition-colors">
      {metaData.site.logo}
    </Link>
  );
};
