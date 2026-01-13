"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

// if is client-side, register ScrollTrigger plugin
if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger);
}
const gsapHook = useGSAP;
export default gsapHook