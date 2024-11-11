"use client";

import { setTheme } from "@/store/reducers/themeReducer";
import { AppDispatch, RootState } from "@/store/store";
import AutoResetPagesScroll from "@/ui/components/AutoResetScroll/AutoResetScroll";
import Footer from "@/ui/components/Footer/Footer";
import NavBar from "@/ui/components/NavBar/NavBar";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

function GeneralLayout({ children }: Props) {
  const { mode } = useSelector((state: RootState) => state.ThemePreference);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Initial theme detection based on system preferences
    dispatch(setTheme("auto"));
  }, [dispatch]);

  useEffect(() => {
    // Watch for manual darkMode state changes
    if (mode == "dark") {
      // Check if "dark" class is not already added, then add it
      if (!document.querySelector("html")?.classList.contains("dark")) {
        document.querySelector("html")?.classList.add("dark");
      }
    } else {
      // Remove the "dark" class if it's present
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [mode]);
  return (
    <div className="size-full overflow-y-auto relative isolate flex items-start justify-start gap-2 bg-base-white dark:bg-base-black">
      <AutoResetPagesScroll />

      <Image
        src={"/images/myImage1.jpg"}
        alt={"asterixh image as bg"}
        width={800}
        height={800}
        priority
        className="size-full object-cover object-center fixed inset-0 -z-10 brightness-50 dark:brightness-[0.2]"
      />
      <NavBar />
      <main className="w-full h-fit relative max-h-full overflow-y-auto flex flex-col gap-2 items-start justify-start">
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default GeneralLayout;
