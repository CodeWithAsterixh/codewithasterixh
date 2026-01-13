import React from "react";
import { cn } from "d/lib/utils";

type Props = {
  containerClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  emClassName?: string;
};

export default function Logo({
  containerClassName,
  iconClassName,
  textClassName,
  emClassName,
}: Readonly<Props>) {
  return (
    <div className={cn("w-fit flex items-center gap-2", containerClassName)}>
      <span
        className={cn(
          "size-10 sm:size-11 md:size-12 pl-1.5 pt-1.5 leading-0 rounded-full bg-base-100 text-2xl sm:text-3xl md:text-4xl text-primary font-bitcount flex items-center justify-center",
          iconClassName
        )}
      >
        P
      </span>
      <strong
        className={cn(
          "text-lg sm:text-xl md:text-2xl mt-1 leading-normal text-primary",
          textClassName
        )}
      >
        Paul{" "}
        <em
          className={cn(
            "not-italic font-bitcount text-base-content",
            emClassName
          )}
        >
          .
        </em>
      </strong>
    </div>
  );
}
