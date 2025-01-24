"use client";

import { Box, Button, Skeleton } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiArrowToRight } from "react-icons/bi";

type Props = {
  datas?: {
    description?: string;
    projectUrl?: string;
    projectId?: string;
    projectImage?: string;
    projectName?: string;
  };
  index?: number;
};

export function WorkCardSkeleton() {
  return (
    <Box className="w-full min-h-fit max-h-full border-2 border-base-black/50 dark:border-base-white/50 p-2 h-[17rem] min-[498px]:h-[18.5rem] sm:h-80 flex group flex-col gap-2 items-center relative isolate overflow-hidden rounded-md bg-black/20">
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={128}
        animation="wave"
        className="!block !size-full !absolute !inset-0 !-z-10 !bg-fuchsia-700/10"
      />

      {/* Title Skeleton */}
      <Skeleton
        variant="text"
        width="60%"
        height={50}
        animation="wave"
        className="rounded-md mt-2"
      />

      {/* Description Skeleton */}
      <Box className="w-full p-2 rounded-md bg-base-black/5 dark:bg-base-white/5 !flex !flex-col gap-2">
        <Skeleton
          variant="text"
          width="40%"
          height={28}
          animation="wave"
          className="rounded-md"
        />
        <Box className="w-full !flex !flex-col gap-1">
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            animation="wave"
            className="rounded-md"
          />
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            animation="wave"
            className="rounded-md"
          />
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            animation="wave"
            className="rounded-md"
          />
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            animation="wave"
            className="rounded-md"
          />
        </Box>
      </Box>

      {/* Buttons Skeleton */}
      <Box className="w-full h-fit flex flex-wrap items-center justify-between gap-3 mt-2">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={36}
          animation="wave"
          className="rounded-md"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={36}
          animation="wave"
          className="rounded-md"
        />
      </Box>
    </Box>
  );
}
function WorkCard({ datas, index }: Props) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full min-h-fit max-h-full border-2 border-base-black/50 dark:border-base-white/50 p-2 h-[17rem] min-[498px]:h-[18.5rem] sm:h-80 flex group flex-col gap-2 items-center relative isolate overflow-hidden rounded-md bg-black/20"
    >
      <span className="w-fit h-fit p-2 rounded-br-md text-xs block absolute top-0 left-0 text-white bg-black/20 backdrop-blur-lg">
        {index}
      </span>
      <span
        className={clsx(
          "block size-full absolute inset-0 -z-10 bg-fuchsia-700/10",
          {
            "animate-pulse": !datas?.projectImage,
          }
        )}
      >
        {datas?.projectImage && (
          <Image
            src={datas?.projectImage}
            alt={"image of the " + datas.projectName + " project"}
            width={500}
            height={500}
            loading="lazy"
            className={clsx(
              "size-full object-cover object-center duration-300",
              {
                "scale-125 brightness-[.3] blur-sm": hovered,
                "scale-100 brightness-[.6]": !hovered,
              }
            )}
          />
        )}
      </span>
      <h2
        className={clsx(
          "text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 duration-500 relative flex items-start justify-start gap-2 flex-col",
          "after:content-[''] after:relative after:w-full after:h-0.5 after:bg-red-500 after:rounded-full",
          {
            "top-0 -translate-y-0": hovered,
            "top-1/2 bg-black/20 backdrop-blur-lg px-2 pt-2 rounded-md -translate-y-1/2 delay-300":
              !hovered,
          }
        )}
      >
        {datas?.projectName}
      </h2>
      {datas?.description && (
        <div
          className={clsx(
            "w-full p-2 rounded-md bg-base-black/5 backdrop-blur-lg delay-300 duration-500 relative dark:bg-base-white/5 flex flex-col items-start justify-start gap-2",
            {
              "translate-y-0 opacity-100 scale-100": hovered,
              "translate-y-16 opacity-0 scale-50": !hovered,
            }
          )}
        >
          <h4
            className={
              "text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-start justify-start gap-2 flex-col " +
              "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500/50 after:rounded-full"
            }
          >
            Description
          </h4>
          <p className="w-full h-fit text-xs min-[498px]:text-sm sm:text-base font-mono line-clamp-4">
            {datas.description}
          </p>
        </div>
      )}

      <div
        className={clsx(
          "w-full h-fit flex flex-wrap items-center delay-[400ms] duration-500 justify-between gap-3",
          {
            "translate-y-0 translate-x-0 opacity-100 scale-100 delay-300":
              hovered,
            "translate-y-16 -translate-x-16 opacity-0 scale-50": !hovered,
          }
        )}
      >
        <Link
          href={`/projects/${datas?.projectId}`}
          className="flex-grow basis-60"
        >
          <Button
            variant="contained"
            className={clsx(
              "!p-2 !text-xs !w-full min-[498px]:!text-sm sm:!text-base font-mono !px-4 !bg-black/90 hover:!bg-black/70 !text-white"
            )}
            startIcon={<BiArrowToRight />}
            disableElevation
          >
            Read more
          </Button>
        </Link>
        <Link href={`${datas?.projectUrl}`} className="flex-grow basis-60">
          <Button
            variant="contained"
            className="!p-2 !text-xs !w-full min-[498px]:!text-sm sm:!text-base font-mono !px-4 !bg-black/90 hover:!bg-black/70 !text-white"
            startIcon={<BiArrowToRight />}
            disableElevation
          >
            View project
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default WorkCard;
