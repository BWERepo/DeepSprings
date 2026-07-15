import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Monthly Sales & Calendar — Deep Springs Discount Fabrics",
  description:
    "This month's sales at Deep Springs Discount Fabrics, including the All KY/TN Shop Hop: $1 off per yard storewide, 10% off notions, and Shop Hop Sundays.",
  openGraph: {
    title: "Monthly Sales & Calendar — Deep Springs Discount Fabrics",
    description:
      "This month's sales, discounts, and shop calendar at Deep Springs Discount Fabrics.",
    url: "/sales",
  },
};

const CALENDAR = [
  {
    tag: "July",
    title: "Shop Hop kickoff",
    desc: "Extended 9–6 hours all month. $1 off per yard storewide daily.",
  },
  {
    tag: "Jul 26",
    title: "Shop Hop Sunday",
    desc: "Special open day 11 am – 4 pm with door prizes and giveaways.",
  },
  {
    tag: "August",
    title: "Shop Hop continues",
    desc: "Extended hours 9–6, Monday through Saturday, all month long.",
  },
  {
    tag: "Aug 23",
    title: "Shop Hop Sunday",
    desc: "Second special Sunday, 11 am – 4 pm. Come join the fun.",
  },
];

const FINE_PRINT = [
  "The $1-off-per-yard sale requires a 1-yard minimum cut.",
  "A few specialty items are excluded from the storewide discount.",
  "10% off applies to many notions, ribbons, and accessories.",
  "Door prizes drawn periodically throughout Shop Hop weekends.",
];

export default function SalesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-14 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            RIGHT NOW
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Monthly sales & the shop calendar.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every month brings a fresh reason to stop by. Here&apos;s
            what&apos;s happening at the shop and what&apos;s coming.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              NOW THROUGH AUGUST
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              All KY / TN Shop Hop
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Presented by Shop Hop Inc.
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              We&apos;re participating with extended hours 9 am – 6 pm Monday
              through Saturday, plus two special Shop Hop Sundays.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              {
                big: "$1 off",
                small: "per yard storewide, daily (1 yd min, a few exclusions)",
              },
              { big: "10% off", small: "many other items throughout the shop" },
              { big: "Jul 26 & Aug 23", small: "Shop Hop Sundays, 11 am – 4 pm" },
              { big: "Door prizes", small: "and a giveaway drawing" },
            ].map((s, i) => (
              <Reveal key={s.big} delay={i * 80}>
                <div>
                  <p className="font-display text-3xl text-terracotta">
                    {s.big}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.small}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            THE CALENDAR
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            A season of specials, at a glance.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CALENDAR.map((item, i) => (
            <Reveal key={item.tag + item.title} delay={(i % 4) * 90}>
              <article className="h-full rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta hover:shadow-md">
                <p className="text-xs font-semibold tracking-widest text-terracotta">
                  {item.tag}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="group relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/bolts--HVoKAQT.jpg"
                alt="Rows of folded cotton fabric bolts"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              THE FINE PRINT
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              What to know before you come.
            </h2>
            <ul className="mt-6 space-y-3">
              {FINE_PRINT.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-10">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          Never miss a sale.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Subscribe for a monthly note about upcoming discounts, Shop Hop
          weekends, and new arrivals on the shelves.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
        >
          Join the list →
        </Link>
      </Reveal>
    </>
  );
}
