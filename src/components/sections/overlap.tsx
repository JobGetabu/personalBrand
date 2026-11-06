"use client";
import { useSyncExternalStore } from "react";
import { workingHours } from "@/lib/site";

const VISITOR = { start: 9, end: 17 };
const subscribe = () => () => {};
// Visitor's UTC offset in hours, read only in the browser. Nothing leaves the page.
const getOffset = () => -new Date().getTimezoneOffset() / 60;

function band(startLocal: number, endLocal: number, offset: number) {
  // Convert a local working window to UTC hours [0, 24)
  const s = (((startLocal - offset) % 24) + 24) % 24;
  const len = endLocal - startLocal;
  return Array.from({ length: 24 }, (_, h) => (h - s + 24) % 24 < len);
}

/** synt.ax-style "engineering day": your working hours against mine, computed in the browser. */
export function Overlap() {
  const offset = useSyncExternalStore(subscribe, getOffset, () => null);
  const mine = band(workingHours.start, workingHours.end, workingHours.utcOffset);
  const yours = offset === null ? null : band(VISITOR.start, VISITOR.end, offset);
  const overlap = yours ? mine.filter((m, i) => m && yours[i]).length : null;
  const tz = offset === null ? "" : `UTC${offset >= 0 ? "+" : "−"}${Math.abs(offset)}`;

  return (
    <div className="rounded-[var(--radius)] border hairline bg-surface p-5">
      <p className="label-mono">Your day vs mine · computed in your browser</p>
      <div className="mt-4 grid gap-2" aria-hidden="true">
        {[
          { label: "Nairobi", row: mine, cls: "bg-accent" },
          { label: offset === null ? "You" : `You ${tz}`, row: yours, cls: "bg-violet" },
        ].map((r) => (
          <div key={r.label} className="grid grid-cols-[72px_1fr] items-center gap-3">
            <span className="font-mono text-[11px] text-muted">{r.label}</span>
            <div className="grid h-3 grid-cols-24 gap-px overflow-hidden rounded-full bg-surface-2">
              {Array.from({ length: 24 }, (_, h) => (
                <span key={h} className={r.row?.[h] ? r.cls : ""} />
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[72px_1fr] gap-3 font-mono text-[10px] text-muted">
          <span />
          <span className="flex justify-between">
            <span>00 UTC</span>
            <span>12</span>
            <span>24</span>
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm" aria-live="polite">
        {overlap === null
          ? "Remote-friendly, EAT (UTC+3)."
          : overlap > 0
            ? `${overlap} hour${overlap === 1 ? "" : "s"} of overlap with a 9 to 5 in your time zone.`
            : "No direct overlap with a 9 to 5 where you are, so I work async with clear written handoffs."}
      </p>
    </div>
  );
}
