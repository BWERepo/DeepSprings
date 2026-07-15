"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sales", label: "Monthly Sales" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 sm:px-10 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl text-ink">Deep Springs</span>
          <span className="text-xs font-medium tracking-widest text-muted-foreground">
            DISCOUNT FABRICS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-terracotta"
                  : "text-ink hover:text-terracotta"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:8657711487"
          className="text-sm font-medium text-ink hover:text-terracotta"
        >
          (865) 771-1487
        </a>
      </div>
    </header>
  );
}
