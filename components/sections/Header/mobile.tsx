"use client";
import { HoveredElement } from "d/components/HoveredElement";
import { useHash } from "d/lib/hooks/useHash";
import { cn } from "d/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { NavigationItem } from "./navigations";
import { LiquidGlass } from "d/components/liguid__glass";

type Props = {
  navigations: NavigationItem[];
};

export default function MobileVersion({ navigations }: Props) {
  const currentHash = useHash();

  return (
    <LiquidGlass
      as="nav"
      options={{
        "shadow-color": "#0006111a",
        tint: "#001e2940",
        "frost-blur": "5px",
        "distortion-strength": "100",
        "shadow-offset":"10px",
        "shadow-spread":"50px"
      }}
      className="w-full border-2 overflow-hidden border-background/50 min-[360px]:w-[90dvw] pointer-events-auto mx-auto mb-4 rounded-full relative h-fit p-2"
    >
      <ul className="flex items-center justify-between gap-2">
        {navigations.map((nav) => {
          const isActive =
            currentHash === nav.href ||
            (nav.href === "#" && currentHash === "");
          return (
            <li key={nav.name} className="w-full flex items-center gap-2">
              <LiquidGlass
                asChild
                options={
                  !isActive
                    ? {
                        "shadow-color": "rgba(0,0,0,0)",
                        tint: "rgba(0,0,0,0)",
                        "frost-blur": "-10px",
                        "distortion-strength": "-10",
                        "noise-frequency": "1",
                        "outer-shadow-blur": "0",
                        "shadow-blur": "0",
                        "shadow-offset": "0",
                        "shadow-spread": "0",
                      }
                    : {
                        "shadow-color": "#001e2980",
                        tint: "#00061180",
                        "frost-blur": "10px",
                      }
                }
                className={cn(
                  "relative w-full flex flex-col duration-300 gap-1 items-center px-4 py-2 rounded-full transition-colors",
                  {
                    "text-primary": isActive,
                    "!shadow-none": !isActive,
                  }
                )}
              >
                <a href={nav.href}>
                  <DynamicIcon
                    name={nav.icon}
                    strokeWidth={2}
                    className="size-5 duration-300"
                  />
                  <em className="text-xs not-italic duration-300">
                    {nav.name}
                  </em>
                </a>
              </LiquidGlass>
            </li>
          );
        })}
      </ul>
    </LiquidGlass>
  );
}
