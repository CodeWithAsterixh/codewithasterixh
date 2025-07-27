import React from "react";
import Navigations from "./navigations";
import { Button } from "d/components/ui/button";
import Logo from "d/components/SmallItems/logo";
import { LiquidGlass } from "d/components/liguid__glass";

export default function Header() {
  return (
    <LiquidGlass
      as="header"
      options={{
        "shadow-color":"#0006111a",
        "tint":"#00061140",
        "frost-blur":'10px'
      }}
      className="w-full max-w-[90dvw] border-2 overflow-hidden border-background/50 xl:max-w-6xl rounded-full px-4 py-3 flex items-center justify-between fixed top-5 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* logo */}
      <Logo />
      {/* navigations */}

      <Navigations />
      {/* cta (contact me) */}
      <Button variant="dark" className="!rounded-full !py-3 !h-fit">
        Contact Me
      </Button>
    </LiquidGlass>
  );
}
