import Link from "next/link";

/** Closing call to action, between Contact and the Lab. */
export function Closing() {
  return (
    <section aria-label="Closing" className="border-t hairline">
      <div className="container-x py-16 md:py-24">
        <p className="display text-[clamp(2.5rem,8vw,6.5rem)]">
          Apps that <em className="em">feel</em> native.
          <br />
          <Link href="/#contact" className="text-muted transition-colors hover:text-text">
            Let&rsquo;s build <em className="em">yours</em> <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
