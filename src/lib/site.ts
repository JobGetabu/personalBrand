/**
 * Single source of truth for public identity and copy.
 *
 * PRIVACY: everything here is on the allow-list in docs/05-security-and-privacy.md.
 * Never add a phone number, personal email, date of birth, address, IDs or family details.
 * Facts come from docs/04-content-and-media.md. Anything not yet confirmed carries a
 * `TODO(verify)` comment and is listed by `npm run verify:todos`.
 */

export const site = {
  name: "Job Getabu",
  shortName: "JG",
  title: "Senior Mobile Engineer",
  stackLine: "Android · React Native · Flutter · KMM",
  region: "Nairobi, Kenya · works remotely (EAT, UTC+3)",
  timeZone: "Africa/Nairobi",
  // The live address. Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is added.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jobgetabu.vercel.app").replace(/\/$/, ""),
  description:
    "Senior mobile engineer with 10+ years crafting scalable apps for fintech, media and logistics. Shipped 10+ apps used by 5M+ people.",
  heroSummary: "Senior mobile engineer. 10+ years shipping Android, React Native and Flutter apps used by millions.",
  availability: "Open to senior/lead roles · Remote",
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || "", // TODO(verify): Cal.com booking link
  sourceUrl: "https://github.com/JobGetabu/personalBrand",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/job-getabu/" },
  { label: "GitHub", href: "https://github.com/JobGetabu" },
  { label: "X", href: "https://twitter.com/job_getabu" },
  { label: "Google Play", href: "https://play.google.com/store/apps/developer?id=Job+Getabu" },
  // Instagram intentionally omitted until confirmed professional. TODO(verify)
] as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Lab", href: "/#lab" },
] as const;

export const heroStats = [
  { value: 10, suffix: "+", label: "apps shipped" },
  { value: 5, suffix: "M+", label: "users on my code" },
  { value: 53, suffix: "M", label: "reach via My OneApp" },
  { value: 3, suffix: "", label: "awards" },
] as const;

/**
 * Company strip. `logo` points at a monochrome SVG in public/images/logos/ (drawn in the text
 * colour via CSS mask); without one the name shows as a wordmark. Add a logo by dropping
 * <slug>.svg in that folder and setting `logo` here. Trademarks belong to their owners.
 */
export const companies: ReadonlyArray<{ name: string; logo?: string }> = [
  { name: "Discovery" },
  { name: "Vitality" },
  { name: "Visa", logo: "visa.svg" },
  { name: "Andela", logo: "andela.svg" },
  { name: "Safaricom" },
  { name: "Nybble Technologies" },
  { name: "WeR1" },
  { name: "GetMyBoat" },
  { name: "Shackle" },
  { name: "Sendy" },
  { name: "Kazi" },
  { name: "Presta" },
  { name: "Minet" },
  { name: "Syntax" },
];

export const skills = [
  "Kotlin",
  "Jetpack Compose",
  "React Native",
  "Expo",
  "Flutter",
  "Dart",
  "KMM",
  "SwiftUI",
  "TypeScript",
  "GraphQL",
  "Firebase",
  "Supabase",
  "SQLite",
  "Fastlane",
  "GitHub Actions",
  "Clean Architecture",
] as const;

export const shipLayers = [
  {
    name: "Architecture",
    keywords: "Domain · data · UI · modules",
    practices: [
      "Clean Architecture with clear domain, data and UI layers",
      "Offline-first data with a single source of truth",
      "Modular features that teams can own",
    ],
    tools: ["Clean Architecture", "KMM", "SQLite", "Supabase"],
  },
  {
    name: "Interface",
    keywords: "Compose · Fabric · SwiftUI · RTL",
    practices: [
      "Declarative UI that feels native on each platform",
      "Accessibility and RTL from day one",
      "Design systems shared across apps",
    ],
    tools: ["Jetpack Compose", "Fabric", "SwiftUI", "Flutter"],
  },
  {
    name: "Performance",
    keywords: "Measure · profile · cut · guard",
    practices: [
      "Measure cold start, jank and memory before changing anything",
      "Baseline Profiles and lazy init on the startup path",
      "Lists and images tuned for low-end devices",
    ],
    tools: ["Baseline Profiles", "Macrobenchmark", "Hermes", "Perfetto"],
  },
  {
    name: "Quality",
    keywords: "Unit · UI · device cloud · types",
    practices: [
      "Unit tests on the domain, UI tests on the flows that make money",
      "Typed boundaries with TypeScript strict and Kotlin",
      "Device-cloud runs before every release",
    ],
    tools: ["Detox", "Maestro", "Mockito", "LambdaTest"],
  },
  {
    name: "Release",
    keywords: "Build · sign · roll out · flag",
    practices: ["Automated builds, signing and store uploads", "Staged rollouts behind feature flags", "Release notes that a PM can read"],
    tools: ["Fastlane", "GitHub Actions", "EAS", "Play Console"],
  },
  {
    name: "Observability",
    keywords: "Crash-free · funnels · alerts",
    practices: ["Crash-free rate as a team metric", "Funnels and A/B tests that inform the roadmap", "Alerts on regressions, not on noise"],
    tools: ["Crashlytics", "Sentry", "Metabase", "Firebase Analytics"],
  },
] as const;

export const experience = [
  {
    company: "Health insurer (confidential)",
    role: "Mobile Engineer",
    period: "Dec 2025 – Now",
    bullets: [
      "Building member-facing health and wellness apps for a leading health insurer.", // TODO(verify): outcomes once approved
    ],
    tech: ["Mobile", "Health"], // TODO(verify): stack
  },
  {
    company: "Andela",
    role: "Software Engineer",
    period: "2023 – Now",
    bullets: [
      "Mobile engineer embedded with Andela partner teams.",
      "Worked on Safaricom's My OneApp, used by 53M Kenyans.", // TODO(verify): role on My OneApp
      "Now on a US app that reaches 5M Americans.",
    ],
    tech: ["Mobile", "Partner teams"], // TODO(verify): stack
  },
  {
    company: "WeR1",
    role: "Senior React Native Engineer",
    period: "Apr 2025 – Dec 2025",
    bullets: [
      "Built a custom audio player library in 3 months.",
      "Led the migration to the React Native New Architecture and Expo 53.",
      "Cut runtime errors 35% by moving the codebase to TypeScript strict mode.",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Fabric"],
  },
  {
    company: "Shackle", // TODO(verify): contract overlaps GetMyBoat dates
    role: "Senior Android Engineer (contract)",
    period: "Oct 2023 – Jul 2024",
    bullets: [
      "Shipped mobile identity for the Dubai market, doubling reach.",
      "Delivered Arabic localisation, RTL and accessibility.",
      "Added in-app chat that cut support tickets 3×.",
    ],
    tech: ["Kotlin", "Compose", "RTL", "Accessibility"],
  },
  {
    company: "GetMyBoat",
    role: "Senior Android Engineer",
    period: "May 2023 – Mar 2025",
    bullets: [
      "Cut cold start 40% and held a 4.9★ Play rating.",
      "Built offline-first features for patchy marine connectivity.",
      "Lifted retention 25% in key markets.",
    ],
    tech: ["Kotlin", "Compose", "Baseline Profiles", "Room"],
  },
  {
    company: "Sendy",
    role: "Senior Mobile Engineer",
    period: "Nov 2020 – May 2023",
    bullets: [
      "Built the Sendy Fulfillment app from scratch, used in 4+ countries.",
      "Reduced order cancellations 40% and lifted signups 45% through A/B tests.",
      "Kept the app 98% crash-free with 85% test coverage.",
    ],
    tech: ["Kotlin", "Flutter", "Firebase", "GraphQL"],
  },
  {
    company: "Kazi",
    role: "Founder & Technical Lead",
    period: "Nov 2020 – Aug 2022",
    bullets: [
      "Built the Kazi gig-work platform, reaching 50K+ active workers.",
      "Led an 8-person team through funding and launch.", // TODO(verify): funding wording
      "Won MTN App of the Year — Best African Solution 2021.",
    ],
    tech: ["Flutter", "Kotlin", "Firebase", "Node"],
  },
  {
    company: "Presta Capital",
    role: "Android Developer",
    period: "2019 – 2020",
    bullets: [
      "Modernised the Presta customer app used by 20K+ people.",
      "Integrated 10+ banks into the lending flow.",
      "Improved acquisition and retention by up to 60%.",
    ],
    tech: ["Kotlin", "Java", "REST", "MVVM"],
  },
  {
    company: "Syntax Ltd",
    role: "iOS & Android Developer",
    period: "Apr 2019 – Mar 2020",
    bullets: [
      "Built the Drop Express apps from scratch with Mapbox driver navigation.",
      "Open-sourced DroidNet and DroidLocation.",
      "Shipped native iOS and Android in parallel.",
    ],
    tech: ["Kotlin", "Swift", "Mapbox"],
  },
  {
    company: "Andela Learning Community · DSC DeKUT",
    role: "Community Lead",
    period: "2018 – 2019",
    bullets: [
      "Led the Andela Learning Community alongside Developer Student Clubs at DeKUT.",
      "Upskilled 200+ developers through study jams and workshops.",
      "Ran Android and Flutter tracks.",
      "Mentored the IEEEmadC 2018 winning team.",
    ],
    tech: ["Community", "Android", "Flutter"],
  },
] as const;

export const services = [
  {
    title: "Mobile app builds",
    who: "Founders and product teams",
    outcome: "From MVP to a store-ready app that scales, on Android, iOS or both.",
    includes: ["Discovery and architecture", "Native, React Native or Flutter build", "CI/CD and store release"],
    timeline: "8–16 weeks",
  },
  {
    title: "Architecture & migration",
    who: "Teams with a growing codebase",
    outcome: "Move to the RN New Architecture, KMM or Compose without stopping delivery.",
    includes: ["Codebase audit and migration plan", "Incremental rollout", "Team pairing"],
    timeline: "4–12 weeks",
  },
  {
    title: "Performance & reliability audit",
    who: "Apps with slow starts, jank or crashes",
    outcome: "A measured plan and fixes for cold start, jank and crash-free rate.",
    includes: ["Profiling report", "Prioritised fixes", "Regression guards in CI"],
    timeline: "2–4 weeks",
  },
  {
    title: "Team leadership & mentoring",
    who: "Engineering managers",
    outcome: "A mobile team that ships with confidence and reviews well.",
    includes: ["Tech-lead cover", "Hiring loops", "Mentoring and code review"],
    timeline: "Ongoing",
  },
] as const;

export const recognition = [
  {
    title: "1st place — DeckWatch",
    by: "OSF Kenya · Code for Africa, Ushahidi & OSF Africa", // TODO(verify): official event/award name
    year: "2026",
    note: "Live public-safety incident map for Kenya's 47 counties",
  },
  { title: "MTN Business App of the Year — Best African Solution", by: "MTN", year: "2021", note: "Kazi" },
  { title: "IEEEmadC Best Team Award", by: "IEEE", year: "2018", note: "Darasa app" },
  { title: "Google Africa Scholarship — Android", by: "Google & Andela", year: "", note: "Plus a Google Letter of Commendation" },
  { title: "Andela Learning Community & DSC Lead", by: "DeKUT", year: "2018–2019", note: "200+ developers upskilled" },
] as const;

export const openSource = [
  { repo: "DroidNet", description: "Kotlin library that observes network connectivity states.", fallbackStars: 64 },
  { repo: "DroidLocation", description: "Simple, lifecycle-aware location updates for Android.", fallbackStars: 0 },
  { repo: "Darasa-IEEEMadC", description: "IEEEmadC 2018 Best Team award app.", fallbackStars: 0 },
] as const;

/** Career chapters for About (synt.ax-style "01 / 04" counter). Facts from docs/04. */
export const journey = [
  { year: "2014", title: "Hello, world", text: "First program. Windows apps, then Android." },
  { year: "2018", title: "Community", text: "Led the Andela Learning Community and DSC at DeKUT. Won IEEEmadC Best Team." },
  { year: "2020", title: "Founder", text: "Built Kazi, MTN App of the Year 2021, while shipping Sendy across four countries." },
  { year: "Now", title: "Millions", text: "5M+ users on my code. Now building apps that reach 5M Americans and 53M Kenyans on Safaricom My OneApp." },
] as const;

/** Prefill chips for the contact form. */
export const contactPresets = [
  "Hiring · senior or lead mobile role",
  "New app · MVP to launch",
  "Migration · RN New Architecture or KMM",
  "Rescue · slow starts, jank or crashes",
] as const;

/** Working hours in Nairobi (EAT, UTC+3), used for the "your day vs mine" overlap. */
export const workingHours = { start: 8, end: 18, utcOffset: 3 } as const;
