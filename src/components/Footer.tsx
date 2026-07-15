import Link from "next/link";
import packageJson from "../../package.json";

const BUILD_DATE = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center sm:px-10">
        <p className="font-display text-lg text-ink">
          Deep Springs Discount Fabrics LLC
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          786 Haynes Road · Dandridge, TN 37725 · (865) 771-1487
        </p>
        <nav className="mt-4 flex justify-center gap-6 text-sm font-medium text-ink">
          <Link href="/" className="hover:text-terracotta">
            Home
          </Link>
          <Link href="/sales" className="hover:text-terracotta">
            Sales
          </Link>
          <Link href="/about" className="hover:text-terracotta">
            About
          </Link>
          <Link href="/reviews" className="hover:text-terracotta">
            Reviews
          </Link>
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">
          © 2026 Deep Springs Discount Fabrics.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          v{packageJson.version} · {BUILD_DATE}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Website by{" "}
          <a
            href="https://businesswebexpress.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta"
          >
            Business Web Express
          </a>{" "}
          · businesswebexpress.com
        </p>
      </div>
    </footer>
  );
}
