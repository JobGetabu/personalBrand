"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/** Live Nairobi time. Shows the region's clock only — never the visitor's or Job's live location. */
export function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={`label-mono tabular-nums ${className}`}>
      <span className="sr-only">Local time in Nairobi: </span>
      <span aria-hidden="true">EAT </span>
      <span suppressHydrationWarning>{time ?? "--:--:--"}</span>
    </span>
  );
}
