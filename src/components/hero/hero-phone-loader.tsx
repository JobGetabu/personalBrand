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
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[230px] sm:max-w-[380px] lg:max-w-[520px]">
      <Image
        src={media.heroPhoneMobile.src}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 380px, 230px"
        className={`object-cover transition-opacity duration-700 [mask-image:radial-gradient(closest-side,#000_70%,transparent)] ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {mode !== "poster" && (
        <div className="absolute inset-0">
          <PhoneScene lite={mode === "lite"} onReady={() => setReady(true)} />
        </div>
      )}
      <p className="label-mono absolute left-0 top-full mt-3 flex min-h-11 items-center gap-2" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
        GLSL ink · live
        <span className="hidden text-text/70 [@media(pointer:fine)]:inline">· Move to stir ⟶</span>
        <span className="hidden text-text/70 [@media(pointer:coarse)]:inline">· Tilt or tap</span>
      </p>
      <p className="sr-only">Decorative: a 3D phone whose screen shows the apps I have built, under a green and violet fluid that reacts to your pointer.</p>
    </div>
  );
}
