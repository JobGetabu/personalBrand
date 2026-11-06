"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getLenis } from "./motion/scroll";

/**
 * New page → start at the top, instantly. Next scrolls on navigation too, but smooth scrolling
 * (CSS or Lenis) can swallow that on mobile Safari and leave you mid-page. Back/forward keeps
 * the browser's restored position, and links with a #hash keep their anchor.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
