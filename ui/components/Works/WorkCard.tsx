import { Box, Button, Skeleton } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiArrowToRight } from "react-icons/bi";

type Props = {
  datas?: {
    description?: string;
    projectUrl?: string;
    projectId?: string;
    projectImage?: string;
    projectName?: string;
  };
};

export function WorkCardSkeleton() {
  return (
    <Box className="group border-2 border-b-black/30 dark:border-b-white/30 w-full flex-grow basis-64 flex flex-col gap-2 rounded-md p-3 sm:w-52 md:w-72 bg-base-black/5 dark:bg-base-white/5 backdrop-blur-md">
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={128}
        animation="wave"
        className="bg-fuchsia-700/10 rounded-md"
      />

      {/* Title Skeleton */}
      <Skeleton
        variant="text"
        width="60%"
        height={24}
        animation="wave"
        className="rounded-md mt-2"
      />

      {/* Description Skeleton */}
      <Box className="w-full p-2 rounded-md bg-base-black/5 dark:bg-base-white/5 flex flex-col gap-2">
        <Skeleton
          variant="text"
          width="40%"
          height={20}
          animation="wave"
          className="rounded-md"
        />
        <Skeleton
          variant="text"
          width="80%"
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

      {/* Buttons Skeleton */}
      <Box className="w-full h-fit flex flex-wrap items-center justify-between gap-3 mt-2">
        <Skeleton
          variant="rectangular"
          width="48%"
          height={36}
          animation="wave"
          className="rounded-md"
        />
        <Skeleton
          variant="rectangular"
          width="48%"
          height={36}
          animation="wave"
          className="rounded-md"
        />
      </Box>
    </Box>
  );
}
function WorkCard({ datas }: Props) {
  return (
    <div className="border-2 border-b-black/30 dark:border-b-white/30 w-full flex-grow basis-64 flex flex-col gap-2 rounded-md p-3 sm:w-52 md:w-72 bg-base-black/5 dark:bg-base-white/5 backdrop-blur-md">
      <span
        className={clsx(
          "block w-full h-32 bg-fuchsia-700/10 rounded-md overflow-hidden",
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
            className="size-full object-cover object-center hover:scale-125 duration-1000"
          />
        )}
      </span>
      <h2
        className={
          "text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-start justify-start gap-2 flex-col " +
          "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500 after:rounded-full"
        }
      >
        {datas?.projectName}
      </h2>
      {datas?.description && (
        <div className="w-full p-2 rounded-md bg-base-black/5 dark:bg-base-white/5 flex flex-col items-start justify-start gap-2">
          <h4
            className={
              "text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-start justify-start gap-2 flex-col " +
              "after:content-[''] after:relative after:w-10 after:h-0.5 after:bg-red-500/50 after:rounded-full"
            }
          >
            Description
          </h4>
          <p className="w-full h-fit text-xs min-[498px]:text-sm sm:text-base font-mono">
            {datas.description}
          </p>
        </div>
      )}

      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/projects/${datas?.projectId}`}
          className="flex-grow basis-60"
        >
          <Button
            variant="contained"
            className="!p-2 !text-xs !w-full min-[498px]:!text-sm sm:!text-base font-mono !px-4 !bg-black/90 hover:!bg-black/70 !text-white"
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
