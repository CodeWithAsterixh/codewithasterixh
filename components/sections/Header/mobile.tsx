"use client"
import { HoveredElement } from "d/components/HoveredElement";
import { useHash } from "d/lib/hooks/useHash";
import { cn } from "d/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavigationItem } from "./navigations";

type Props = {
  navigations: NavigationItem[];
};

export default function MobileVersion({navigations}: Props) {
  const currentHash = useHash()
  return <nav className="w-full min-[360px]:w-[90dvw] pointer-events-auto mx-auto mb-4 rounded-full h-fit bg-base-100/30 backdrop-blur-3xl p-2">
    <ul className="flex items-center justify-between gap-2">
      {navigations.map((nav) => {
        const isActive = currentHash === nav.href || (nav.href === "#" && currentHash === "");
        return (
        <li key={nav.name} className="w-full flex items-center gap-2">
            <HoveredElement asChild hoveredClass={!isActive?{
                true: "text-primary bg-base-200",
                false: "text-base-content bg-transparent",
            }:undefined} className={cn("relative w-full flex flex-col duration-300 gap-1 items-center px-4 py-2 rounded-full transition-colors",{
                "bg-base-300 text-primary":isActive,
            })}>
                <a
              href={nav.href}
            >
              <DynamicIcon
                name={nav.icon}
                strokeWidth={2}
                className="size-5 duration-300"/>
              <em className="text-xs not-italic duration-300">{nav.name}</em>
            </a>
            </HoveredElement>
          </li>
      )
      })}
    </ul>
  </nav>;
}
