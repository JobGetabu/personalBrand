import { ScrollReset } from "@/components/scroll-reset";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { site, socials } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionRoot } from "@/components/motion/motion-root";
import { JsonLd } from "@/components/json-ld";
import { SoundToggle } from "@/components/sound-toggle";

const display = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});
const serif = localFont({
  src: "../fonts/instrument-serif-latin-400-italic.woff2",
  variable: "--font-serif-italic",
  weight: "400",
  style: "italic",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-code",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "senior mobile engineer Kenya",
    "React Native engineer remote",
    "Flutter developer Nairobi",
    "Android Kotlin Compose consultant",
    "KMM",
  ],
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    url: "/",
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", creator: "@job_getabu" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080A" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
  ],
  colorScheme: "dark light",
};

// Sets the theme before first paint to avoid a flash. Dark is the default.
// Also marks repeat visits so the intro curtain is skipped.
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t;if(sessionStorage.getItem("seen"))d.classList.add("seen");sessionStorage.setItem("seen","1");}catch(e){}`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Reading the nonce opts every page into per-request rendering (required for nonce CSP).
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    image: `${site.url}/images/about/avatar.webp`,
    sameAs: socials.map((s) => s.href),
    knowsAbout: [
      "Android",
      "Kotlin",
      "Jetpack Compose",
      "React Native",
      "Expo",
      "Flutter",
      "Kotlin Multiplatform",
      "SwiftUI",
      "Mobile performance",
    ],
    // PRIVACY: never add address, telephone, email or birthDate here.
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={person} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <div className="intro" aria-hidden="true">
          <span className="intro-mark">JG</span>
          <span className="intro-bar" />
        </div>
        <MotionRoot />
        <ScrollReset />
        <SoundToggle />
      </body>
    </html>
  );
}
