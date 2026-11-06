"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Cursor } from "./cursor";
import { afterInteraction } from "./scroll";

/**
 * Loads the motion layer after first paint so it never competes with LCP.
 * Content is fully readable without it (and with JS disabled).
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const start = () =>
      import("./init").then(({ initMotion }) => {
        if (!cancelled) cleanup = initMotion();
      });
    const cancel = afterInteraction(start, 3000);
    return () => {
      cancelled = true;
      cancel();
      cleanup?.();
    };
  }, [pathname]);

  return <Cursor />;
}
