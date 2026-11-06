import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, devices and software Job Getabu uses to build mobile apps.",
  alternates: { canonical: "/uses" },
};

// TODO(verify): Job to confirm the exact gear list.
const groups = [
  { name: "Editors & IDEs", items: ["Android Studio", "Xcode", "VS Code", "Cursor / Claude Code"] },
  { name: "Mobile", items: ["Kotlin + Jetpack Compose", "React Native + Expo", "Flutter", "Kotlin Multiplatform"] },
  { name: "Quality & release", items: ["Detox and Maestro", "Fastlane", "GitHub Actions", "Firebase Crashlytics / Sentry"] },
  { name: "Design & thinking", items: ["Figma", "Excalidraw", "A paper notebook"] },
];

export default function UsesPage() {
  return (
    <div className="container-x pb-24 pt-40">
      <p className="label-mono mb-6">
        <span className="text-accent">/uses</span> — Tools of the trade
      </p>
      <h1 className="display text-[clamp(3rem,9vw,7rem)]">
        What I <em className="em">use</em>.
      </h1>
      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {groups.map((g) => (
          <section key={g.name} aria-labelledby={g.name}>
            <h2 id={g.name} className="label-mono mb-4">
              {g.name}
            </h2>
            <ul className="divide-y divide-line border-y hairline">
              {g.items.map((i) => (
                <li key={i} className="py-3 text-lg">
                  {i}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
