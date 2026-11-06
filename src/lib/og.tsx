import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "./site";

// Generated base art (docs/03-image-prompts.md §3): phone on the right, empty space left for type.
const base = `data:image/png;base64,${readFileSync(path.join(process.cwd(), "src/assets/og-base.png")).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };

/** Branded OG card (1200×630). Emphasis word written as *word* is drawn in the accent colour. */
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#07080A",
        position: "relative",
        color: "#EDEEF0",
        fontFamily: "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={base} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, color: "#8A8F98", letterSpacing: 2 }}>
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 14,
            border: "1px solid #1C1F26",
            background: "#0E1014",
            alignItems: "center",
            justifyContent: "center",
            color: "#EDEEF0",
            fontWeight: 700,
          }}
        >
          JG
        </div>
        {eyebrow.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1, maxWidth: 720 }}>
        {parts.map((p, i) =>
          p.startsWith("*") ? (
            <span key={i} style={{ color: "#3DFFA2", fontStyle: "italic", marginRight: parts[i + 1]?.startsWith(" ") ? 22 : 0 }}>
              {p.slice(1, -1)}
            </span>
          ) : (
            <span key={i} style={{ marginRight: 22 }}>
              {p.trim()}
            </span>
          ),
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8A8F98" }}>
        <span>
          {site.name} · {site.title}
        </span>
        <span style={{ color: "#3DFFA2" }}>{footer ?? site.url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>,
    ogSize,
  );
}
