"use client";

import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import clsx from "clsx";
import NextImage from "next/image"; // Renamed to avoid conflict with component

interface Props {
  imgUrl?: {
    type: "external" | "internal";
    url: string;
  };
  content: string;
  className?: string;
  alt?: string;
}

export default function Image({ alt, imgUrl, content, className }: Props) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgError(false); // Reset the error state whenever imgUrl changes
    if (imgUrl) {
      setIsLoading(false); // Show loading skeleton initially when imgUrl changes
    }
  }, [imgUrl]);

  return (
    <>
      {isLoading || imgError ? (
        <Skeleton animation="wave" variant="circular" className="size-full" />
      ) : (
        imgUrl &&
        (imgUrl.type === "external" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl.url}
            alt={alt || `Illustration of ${content}`}
            title={`My ${content} image`}
            loading="lazy"
            decoding="async"
            width="500"
            height="500"
            onLoad={() => setIsLoading(false)} // Hide skeleton on successful load
            onError={() => {
              setImgError(true);
              setIsLoading(false); // Hide skeleton if there's an error
            }}
            className={clsx("size-full object-cover object-center", className)}
          />
        ) : (
          <NextImage
            src={imgUrl.url}
            alt={alt || `Illustration of ${content}`}
            title={`My ${content} image`}
            layout="responsive" // Adjusts image to be responsive
            width={500}
            height={500}
            onLoadingComplete={() => setIsLoading(false)} // Hide skeleton when loaded
            onError={() => {
              setImgError(true);
              setIsLoading(false); // Hide skeleton on error
            }}
            className={clsx("size-full object-cover object-center", className)}
            loading="lazy" // Enables lazy loading
            unoptimized // Skips Next.js optimization if imgUrl is a remote image without Next.js loader config
          />
        ))
      )}
    </>
  );
}
