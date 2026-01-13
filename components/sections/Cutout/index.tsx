import Cowlick from "d/components/SmallItems/cowlick";
import { cn } from "d/lib/utils";
import React, { Fragment } from "react";

type Props = {
  items?: string[];
  itemClassName?: string;
  separatorClassName?: string;
  className?: string;
};

export default function Cutout({
  items = ["Mock up", "Design", "Mobile", "Responsive", "SEO"],
  className,
  itemClassName,
  separatorClassName,
}: Readonly<Props>) {
  return (
    <aside
      className={cn(
        "w-full bg-base-300 py-5 flex items-center justify-center gap-10 isolate overflow-hidden pointer-events-none",
        className
      )}
    >
      {items.map((item, idx, arr) => {
        const last = arr.at(-1) === item
        return (
          <Fragment key={idx+1}>
          <strong className={cn("text-2xl font-bitcount text-accent-content opacity-50 mt-1", itemClassName)}>
            {item}
          </strong>
          {!last&&<Cowlick variant="cross" className="scale-75" itemClassName={cn("!bg-accent-content opacity-50",separatorClassName)}/>}
          </Fragment>
        );
      })}
    </aside>
  );
}
