import Link from "next/link";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="border-b border-line bg-bg/72 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-14 w-full max-w-page items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-sans text-[17px] font-semibold tracking-tightest text-ink"
        >
          Pranav<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-2 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
