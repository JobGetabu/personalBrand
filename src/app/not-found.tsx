import Link from "next/link";
import { DroppedPhone } from "@/components/dropped-phone";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-2">
      <div>
        <p className="label-mono mb-6">
          <span className="text-accent">404</span> — Page not found
        </p>
        <h1 className="display text-[clamp(3rem,9vw,7rem)]">
          You <em className="em">dropped</em> it.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted">This page doesn&rsquo;t exist. Pick the phone back up, or head home.</p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 font-medium text-accent-ink"
          data-magnetic
        >
          Back home <span aria-hidden="true">→</span>
        </Link>
      </div>
      <DroppedPhone />
    </div>
  );
}
