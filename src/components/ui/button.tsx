import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "primary" | "ghost"; external?: boolean } & Omit<ComponentProps<"a">, "href">;

/** Magnetic pill button. The magnet is added by the motion layer on fine pointers only. */
export function Button({ href, children, variant = "primary", external, className = "", ...rest }: Props) {
  const cls = `group relative inline-flex min-h-12 items-center gap-3 rounded-full px-6 text-sm font-medium transition-colors duration-300 ${
    variant === "primary" ? "bg-accent text-accent-ink hover:bg-text hover:text-bg" : "border hairline text-text hover:border-text"
  } ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-magnetic {...rest}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} className={cls} data-magnetic {...rest}>
      {inner}
    </Link>
  );
}
