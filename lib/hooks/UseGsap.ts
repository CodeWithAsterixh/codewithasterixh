"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

// if is client-side, register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export default useGSAP