import React from "react";
import Navigations from "./navigations";
import { Button } from "d/components/ui/button";
import Logo from "d/components/SmallItems/logo";


export default function Header() {
  return (
    <header className="w-full max-w-[90dvw] xl:max-w-6xl rounded-full px-4 py-3 flex items-center justify-between bg-base-300/30 backdrop-blur-3xl shadow-lg shadow-base-300/70 fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      {/* logo */}
      <Logo/>
      {/* navigations */}

      <Navigations />
      {/* cta (contact me) */}
      <Button variant="dark" className="!rounded-full !py-3 !h-fit">Contact Me</Button>
    </header>
  );
}
