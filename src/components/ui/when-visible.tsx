"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only once near the viewport, and tells them whether they are visible,
 * so heavy canvases load lazily and pause off-screen.
 */
export function WhenVisible({
  children,
  rootMargin = "200px",
  className,
  fallback,
}: {
  children: (visible: boolean) => ReactNode;
  rootMargin?: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin },
    );
    io.observe(el);
    const onVis = () => document.hidden && setVisible(false);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [rootMargin]);
  return (
    <div ref={ref} className={className}>
      {mounted ? children(visible) : fallback}
    </div>
  );
}
