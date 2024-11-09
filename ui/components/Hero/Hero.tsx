import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiArrowToBottom, BiArrowToRight } from "react-icons/bi";

type Props = {
  main?: string | React.ReactNode;
  sub?: string | React.ReactNode;
  extra1?: string | React.ReactNode;
  extra2?: string | React.ReactNode;
  cta?: {
    text: string | React.ReactNode;
    navto: string;
  };
};

function HeroSection({ extra1, extra2, main, sub, cta }: Props) {
  return (
    <section className="p-4 isolate w-full relative h-screen min-h-fit flex items-center justify-center text-black dark:text-white">
      <div className="w-fit text-center h-fit px-8 py-16 rounded-md flex items-center justify-center gap-8 flex-col relative !bg-white/30 dark:!bg-black/30 backdrop-blur-md">
        <h1 className="text-xl sm:text-3xl font-bold">{main}</h1>
        <b className="text-lg sm:text-2xl font-normal font-mono">{sub}</b>
        <b className="sub-text">{extra1}</b>
        <b className="sub-text">{extra2}</b>
        {cta && (
          <div className="cta">
            <Link href={cta.navto}>
              <Button
                variant="contained"
                className="!bg-white/30 !text-black dark:!text-white !backdrop-blur-md"
                startIcon={<BiArrowToRight />}
              >
                {cta.text}
              </Button>
            </Link>
          </div>
        )}
      </div>
      <span className="absolute bottom-5 animate-bounce text-base-white left-0 w-full flex items-center justify-center text-3xl"><BiArrowToBottom/></span>
    </section>
  );
}

export default HeroSection;
