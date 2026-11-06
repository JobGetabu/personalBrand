"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";

/** matchMedia as a subscription; `false` on the server. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

/** Keeps a ref in sync with the latest value, for use inside rAF loops. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

const storageEvent = "local-pref";
/** A localStorage-backed preference that re-renders subscribers when it changes. */
export function usePref(key: string, fallback: string) {
  const value = useSyncExternalStore(
    (cb) => {
      window.addEventListener(storageEvent, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(storageEvent, cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => {
      try {
        return localStorage.getItem(key) ?? fallback;
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );
  const set = (v: string) => {
    try {
      localStorage.setItem(key, v);
    } catch {}
    window.dispatchEvent(new Event(storageEvent));
  };
  return [value, set] as const;
}

/** The current data-theme on <html>. */
export function useTheme() {
  return useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark" as const,
  );
}
