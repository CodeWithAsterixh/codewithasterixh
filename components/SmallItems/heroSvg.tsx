import React from "react";
import {
  PassThroughElement,
  PassThroughElementProps,
} from "../PassThroughElement";
import { cn } from "d/lib/utils";

interface HeroSvgProps extends PassThroughElementProps<React.ElementType> {
  className?:string
}

export default function HeroSvg({
  as: Tag = "div",
  className,
  ...props
}: Readonly<HeroSvgProps>) {

  return (
    <PassThroughElement
    {...props}
    as={Tag}
    className={cn(
      "size-100 honey_comb_bg bg-primary",
      className
    )}
      style={{
        clipPath:
          "shape(from 79.66% 77.27%,curve to 57.00% 90.69% with 69.75% 85.92%,curve to 30.80% 90.12% with 44.26% 95.46%,curve to 15.15% 70.92% with 17.33% 84.78%,curve to 12.61% 44.65% with 12.97% 57.06%,curve to 20.15% 21.15% with 12.25% 32.24%,curve to 42.11% 5.58% with 28.04% 10.06%,curve to 65.93% 11.87% with 56.18% 1.10%,curve to 87.17% 31.68% with 75.69% 22.64%,curve to 94.12% 54.67% with 98.66% 40.72%,curve to 79.66% 77.27% with 89.58% 68.63%)",
          ...props.style,
      }}
    ></PassThroughElement>
    // <Tag {...props} style={{ position: "relative", ...style }}>
    //   <svg
    //     width={svgWidth}
    //     height={svgHeight}
    //     viewBox={`0 0 ${svgWidth} ${svgHeight}`}
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <defs>
    //       {/* clip shape, translated by clipTranslate */}
    //       <clipPath id="honeyClip">
    //         <path
    //           d="M173 -163C235.5 -110.5 305.2 -55.2 319.7 14.5C334.1 84.1 293.3 168.3 230.8 221.1C168.3 274 84.1 295.5 1.3 294.2C-81.6 292.9 -163.1 268.8 -207.3 215.9C-251.4 163.1 -258.2 81.6 -250.3 7.9C-242.4 -65.8 -219.9 -131.5 -175.7 -184C-131.5 -236.5 -65.8 -275.8 -5.3 -270.5C55.2 -265.2 110.5 -215.5 173 -163"
    //           transform={`translate(${tx} ${ty})`}
    //         />
    //       </clipPath>
    //     </defs>



    //     {/* honey‑comb pattern clipped to same shape */}
    //     <g clipPath="url(#honeyClip)">
    //       <foreignObject x="0" y="0" width={patternWidth} height={patternHeight}>
    //         <div
    //           style={{
    //             width: "100%",
    //             height: "100%",
    //             opacity: patternOpacity,
    //             background:
    //               `radial-gradient(circle farthest-side at 0% 50%, var(--bg-color) 23.5%, rgba(255,170,0,0) 0) 21px 30px,` +
    //               `radial-gradient(circle farthest-side at 0% 50%, var(--color) 24%, rgba(240,166,17,0) 0) 19px 30px,` +
    //               `linear-gradient(var(--bg-color) 14%, rgba(240,166,17,0) 0, rgba(240,166,17,0) 85%, var(--bg-color) 0) 0 0,` +
    //               `linear-gradient(150deg, var(--bg-color) 24%, var(--color) 0, var(--color) 26%, rgba(240,166,17,0) 0, rgba(240,166,17,0) 74%, var(--color) 0, var(--color) 76%, var(--bg-color) 0) 0 0,` +
    //               `linear-gradient(30deg, var(--bg-color) 24%, var(--color) 0, var(--color) 26%, rgba(240,166,17,0) 0, rgba(240,166,17,0) 74%, var(--color) 0, var(--color) 76%, var(--bg-color) 0) 0 0,` +
    //               `linear-gradient(90deg, var(--color) 2%, var(--bg-color) 0, var(--bg-color) 98%, var(--color) 0%) 0 0 var(--bg-color)`,
    //             backgroundSize: "40px 60px",
    //           }}
    //         />
    //       </foreignObject>
    //     </g>
    //   </svg>
    // </Tag>
  );
}
