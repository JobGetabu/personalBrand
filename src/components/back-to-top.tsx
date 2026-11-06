"use client";
import { scrollToTarget } from "./motion/scroll";

export function BackToTop() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        scrollToTarget(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="label-mono inline-flex min-h-11 items-center gap-2 hover:text-text"
    >
      Back to top <span aria-hidden="true">↑</span>
    </a>
  );
}
