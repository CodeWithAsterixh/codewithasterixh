"use client"
import { HoveredElement } from "d/components/HoveredElement";
import { useHash } from "d/lib/hooks/useHash";
import { cn } from "d/lib/utils";
import { NavigationItem } from "./navigations";

type Props = {
  navigations: NavigationItem[];
};

export default function DesktopVersion({ navigations }: Props) {
    const currentHash = useHash()
  
  return (
    <nav className="hidden md:flex items-center justify-between w-fit gap-4 absolute top-1/2 left-1/2 -translate-1/2">
      <ul className="flex items-center gap-6">
        {navigations.map((nav) => {
          const isActive = currentHash === nav.href || (nav.href === "#" && currentHash === "");
          return(
          <li key={nav.name} className="flex items-center gap-2">
            <HoveredElement asChild hoveredClass={!isActive?{
                true: "text-base-content before:w-full before:bg-primary-content",
                false: "text-base-content before:w-0 before:bg-transparent",
            }:undefined} className={
              cn(
                "relative before:h-[1px] before:top-[100%] duration-300 before:left-1/2 before:-translate-x-1/2 before:absolute before:duration-300 transition-colors",
                {
                  "text-primary before:w-full before:bg-primary": isActive,
                }
              )
            }>
                <a
              href={nav.href}
            >
              {nav.name}
            </a>
            </HoveredElement>
          </li>
        )
        })}
      </ul>
    </nav>
  );
}
