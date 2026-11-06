import { ImageResponse } from "next/og";
import { site } from "./site";

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
        background: "radial-gradient(circle at 85% 40%, rgba(124,92,255,0.45), rgba(7,8,10,0) 55%), #07080A",
        color: "#EDEEF0",
        fontFamily: "sans-serif",
      }}
    >
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
      <div style={{ display: "flex", flexWrap: "wrap", fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1, maxWidth: 960 }}>
        {parts.map((p, i) =>
          p.startsWith("*") ? (
            <span key={i} style={{ color: "#3DFFA2", fontStyle: "italic", marginRight: 22 }}>
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
