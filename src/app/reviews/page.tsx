import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import QuoteMark from "@/components/QuoteMark";

export const metadata: Metadata = {
  title: "Reviews — Deep Springs Discount Fabrics",
  description:
    "4.9/5 average rating. Kind words from quilters and crafters who've stopped in at Deep Springs Discount Fabrics in Dandridge, TN.",
  openGraph: {
    title: "Reviews — Deep Springs Discount Fabrics",
    description:
      "4.9/5 average rating from quilters and crafters who've stopped in.",
    url: "/reviews",
  },
};

const REVIEWS = [
  {
    quote:
      "A treasure of a fabric shop — worth the drive. The staff were warm and the selection of cotton prints was better than I expected for a small shop.",
    name: "Karen M.",
    location: "Knoxville, TN",
  },
  {
    quote:
      "I brought my mother and we spent two happy hours pulling bolts. Prices were honest, colors were fresh, and we left with a full bag.",
    name: "Lisa P.",
    location: "Asheville, NC",
  },
  {
    quote:
      "This is exactly the kind of down-home shop that's disappearing. I'm so glad they're here. I'll be back every Shop Hop.",
    name: "Ellen R.",
    location: "Sevierville, TN",
  },
  {
    quote:
      "Made a stop during the KY/TN Shop Hop and won a door prize. The quilting cottons are lovely and the discount is real.",
    name: "Marla T.",
    location: "Bowling Green, KY",
  },
  {
    quote:
      "My local. I pop in for a fat quarter and end up staying an hour. Always something new on the shelves.",
    name: "Jeanne W.",
    location: "Dandridge, TN",
  },
  {
    quote:
      "Found the perfect backing for a quilt I'd been stalled on for months. Kind folks, fair prices, easy parking.",
    name: "Rita S.",
    location: "Chattanooga, TN",
  },
];

const STATS = [
  { label: "AVERAGE RATING", value: "4.9 / 5" },
  { label: "REPEAT VISITORS", value: "Most of them" },
  { label: "MILES DRIVEN FOR US", value: "Plenty" },
  { label: "COTTON WE'VE CUT", value: "Miles of it" },
];

export default function ReviewsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-14 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            REVIEWS
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Kind words from folks who&apos;ve stopped in.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Nothing makes us happier than hearing about the quilts, bags,
            aprons, and gifts our fabrics turn into. Here&apos;s a little of
            what customers have said.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream">
        <Reveal className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">
          <QuoteMark className="absolute left-1/2 top-4 -translate-x-1/2 text-[9rem] sm:text-[11rem]" />
          <p className="relative font-display text-2xl text-ink sm:text-3xl">
            &ldquo;The best little fabric shop in East Tennessee. I come home
            every time with more than I planned and no regrets.&rdquo;
          </p>
          <p className="relative mt-4 text-sm text-muted-foreground">
            — Longtime customer
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            RECENT NOTES
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Straight from the cutting counter.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90}>
              <article className="h-full rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta hover:shadow-md">
                <p className="text-terracotta" aria-hidden>
                  ★★★★★
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-ink">{r.name}</p>
                <p className="text-xs tracking-widest text-muted-foreground">
                  {r.location.toUpperCase()}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src="/images/quilt-BmtwRpxq.jpg"
                    alt="Patchwork quilt detail"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="group relative aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src="/images/cutting-B5wLR4NF.jpg"
                    alt="Cutting fabric at the work table"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-xs font-semibold tracking-widest text-terracotta">
                BY THE NUMBERS
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                A small shop with a lot of return visits.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-terracotta">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-10">
        <p className="text-xs font-semibold tracking-widest text-terracotta">
          LEAVE A REVIEW
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          Been in the shop? We&apos;d love to hear about it.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          A note about your visit — the fabric you found, the project you
          took home — makes our week. Drop us a line and we&apos;ll add it to
          the list.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
        >
          Share your story →
        </Link>
      </Reveal>
    </>
  );
}
