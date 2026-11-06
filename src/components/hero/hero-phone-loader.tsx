"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { media } from "@/lib/media";
import { afterInteraction, isLowPower, prefersReducedMotion } from "../motion/scroll";

const PhoneScene = dynamic(() => import("./phone-scene"), { ssr: false });

/**
 * The poster is always rendered first (reserves space, zero CLS). The WebGL phone loads after
 * first paint, only when motion is allowed and WebGL exists. Low-power devices get a lighter
 * scene (fewer DPR, 30fps cap).
 */
export function HeroPhoneLoader() {
  const [mode, setMode] = useState<"poster" | "full" | "lite">("poster");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return;
    return afterInteraction(() => setMode(isLowPower() ? "lite" : "full"), 5000);
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[520px]">
      <Image
        src={media.heroPhoneMobile.src}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 90vw"
        className={`object-cover transition-opacity duration-700 [mask-image:radial-gradient(closest-side,#000_70%,transparent)] ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {mode !== "poster" && (
        <div className="absolute inset-0">
          <PhoneScene lite={mode === "lite"} onReady={() => setReady(true)} />
        </div>
      )}
      <p className="sr-only">Decorative: an abstract 3D phone whose screen shows a green and violet fluid that reacts to your pointer.</p>
    </div>
  );
}
