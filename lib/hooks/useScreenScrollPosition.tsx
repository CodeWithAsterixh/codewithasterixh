import useGSAP from "d/lib/hooks/UseGsap";
import gsap from "gsap";
import React, { createContext, useContext, useRef, useState } from "react";
interface SE {
  s: string;
  e: string;
}
interface screenView {
  section?: string;
  setSection: (val: string) => void;
  setStartEnd: React.Dispatch<
    React.SetStateAction<{
      section: SE;
      main: SE;
    }>
  >;
  ref?: React.RefObject<HTMLDivElement | null>;
}
const ScrollContext = createContext<screenView>({
  section: "",
  setSection() {},
  setStartEnd() {},
});

export const useScrollView = () => {
  const scrollView = useContext(ScrollContext);

  if (!scrollView)
    throw new Error("useScrollView must be in scrollview provider");
  return scrollView;
};

export const ScrollViewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<string>();
  const [startEnd, setStartEnd] = useState<{
    section: SE;
    main: SE;
  }>({
    section: { e: "bottom", s: "top" },
    main: { e: "top", s: "top" },
  });

  useGSAP(() => {
    const card = containerRef.current;
    if (!card) return;
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: `${startEnd.section.s} ${startEnd.main.s}`,
        end: `${startEnd.section.e} ${startEnd.main.e}`,
        toggleActions: "play reverse play reverse",
        onEnter() {
          setSection(containerRef.current?.id);
        },
        onLeave() {
          setSection(undefined);
        },
        onEnterBack() {
          setSection(containerRef.current?.id);
        },
        onLeaveBack() {
          setSection(undefined);
        },
      },
      ease: "none",
    });
  }, {
    dependencies:[startEnd]
  });

  return (
    <ScrollContext.Provider
      value={{
        setSection,
        section,
        ref: containerRef,
        setStartEnd,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
