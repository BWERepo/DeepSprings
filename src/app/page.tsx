import Image from "next/image";
import Link from "next/link";
import GoogleMap from "@/components/GoogleMap";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import QuoteMark from "@/components/QuoteMark";

const GALLERY_PHOTOS = [
  {
    src: "/images/shop-front-door.jpg",
    alt: "The Deep Springs Discount Fabrics storefront and hand-painted sign",
  },
  {
    src: "/images/shop-interior-CEw_8wM2.jpg",
    alt: "Interior of Deep Springs Discount Fabrics",
  },
  {
    src: "/images/hero-fabrics--uejIYr7.jpg",
    alt: "Folded stacks of quilting cotton in warm tones",
  },
  {
    src: "/images/bolts--HVoKAQT.jpg",
    alt: "Rows of folded cotton fabric bolts",
  },
  {
    src: "/images/threads-C_wdyWZX.jpg",
    alt: "Colorful thread spools",
  },
  {
    src: "/images/quilt-BmtwRpxq.jpg",
    alt: "Patchwork quilt detail",
  },
  {
    src: "/images/cutting-B5wLR4NF.jpg",
    alt: "Cutting fabric at the work table",
  },
];

const STATS = [
  { label: "OPEN", value: "Mon–Sat" },
  { label: "HOURS", value: "10–6" },
  { label: "COTTON", value: "100%" },
  { label: "WALK-INS", value: "WELCOME" },
];

const WHAT_WE_CARRY = [
  {
    n: "01",
    title: "Quilting Cottons",
    desc: "Modern, traditional, reproductions, blenders and batiks.",
  },
  {
    n: "02",
    title: "Crafting Fabrics",
    desc: "For bags, aprons, home projects and everything in between.",
  },
  {
    n: "03",
    title: "Thread & Notions",
    desc: "Threads, needles, rulers, marking tools and small essentials.",
  },
  {
    n: "04",
    title: "Ribbon & Trim",
    desc: "Wall of ribbon by the yard, for finishing and gift-making.",
  },
  {
    n: "05",
    title: "Patterns & Panels",
    desc: "Panels, kits and pattern inspiration to get you started.",
  },
  {
    n: "06",
    title: "Discount Prices",
    desc: "$1-off-per-yard events and 10% off many notions during Shop Hop.",
  },
];

const HOURS = [
  { day: "Monday", time: "10 am – 6 pm" },
  { day: "Tuesday", time: "10 am – 6 pm" },
  { day: "Wednesday", time: "10 am – 6 pm" },
  { day: "Thursday", time: "10 am – 6 pm" },
  { day: "Friday", time: "10 am – 6 pm" },
  { day: "Saturday", time: "10 am – 6 pm" },
  { day: "Sunday", time: "Closed" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-terracotta" />
            DANDRIDGE, TENNESSEE — EST. DOWN HOME
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-ink sm:text-6xl lg:text-7xl">
            Your down home shop for{" "}
            <span className="text-terracotta">quality cotton</span> quilting
            & crafting fabrics.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            One hundred percent cotton. Discount prices. Walk in Monday
            through Saturday and get lost among the bolts.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about#visit"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/sales"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-terracotta hover:text-terracotta"
            >
              This Month&apos;s Sales →
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="rounded-2xl bg-cream p-5 transition-transform duration-300 hover:-translate-y-1">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 font-display text-2xl text-ink">
                  {s.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Happening Now */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              HAPPENING NOW
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              All KY / TN Shop Hop
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              July & August
            </p>
            <p className="mt-4 text-muted-foreground">
              We&apos;re participating in Shop Hop Inc&apos;s All KY/TN Shop
              Hop with extended hours 9 am – 6 pm, Monday through Saturday,
              plus two special Shop Hop Sundays.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-3xl text-terracotta">
                  $1 off
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  per yard storewide, daily (1 yd min, a few exclusions)
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-terracotta">10%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  off many other items throughout the shop
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-terracotta">
                  Jul 26 & Aug 23
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shop Hop Sundays, 11 am – 4 pm
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-terracotta">
                  Door prizes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  plus a giveaway drawing and more
                </p>
              </div>
            </div>

            <p className="mt-8 text-muted-foreground">
              Come join us for some great fun — we&apos;ll see you here.
            </p>
            <p className="mt-2 font-medium text-ink">
              786 Haynes Road
              <br />
              Dandridge, TN 37725
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/hero-fabrics--uejIYr7.jpg"
                alt="Folded stacks of quilting cotton in warm tones"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* About the shop */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              ABOUT THE SHOP
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Aisles of cotton, spools of thread, and the good kind of
              getting lost.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Deep Springs Discount Fabrics is a family-run shop tucked into
              the hills of East Tennessee. We carry an ever-changing stock of
              quality 100% cotton quilting and crafting fabrics — priced so
              you can afford to be generous with your next project.
            </p>
            <p className="mt-4 text-muted-foreground">
              Come browse the bolts, pull a color that surprises you, and
              take home enough to make something worth keeping.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/shop-interior-CEw_8wM2.jpg"
                alt="Interior of Deep Springs Discount Fabrics"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              INSIDE THE SHOP
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
              A wall of color for every project on your list.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              From heirloom florals to modern geometrics, thread, ribbon and
              every notion in between. Tap any photo for a closer look.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <Gallery photos={GALLERY_PHOTOS} />
          </Reveal>
        </div>
      </section>

      {/* What we carry */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              WHAT WE CARRY
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
              Everything you need for the next quilt, gift, or
              make-it-yourself afternoon.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_CARRY.map((item, i) => (
              <Reveal key={item.n} delay={(i % 3) * 90}>
                <div className="group">
                  <p className="font-display text-3xl text-terracotta transition-transform duration-300 group-hover:translate-x-1">
                    {item.n}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plan your visit */}
      <section id="visit" className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            PLAN YOUR VISIT
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Come see us in Dandridge.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">
              ADDRESS
            </p>
            <p className="mt-2 text-ink">
              786 Haynes Road
              <br />
              Dandridge, TN 37725
            </p>

            <p className="mt-6 text-xs font-semibold tracking-widest text-muted-foreground">
              PHONE
            </p>
            <a
              href="tel:8657711487"
              className="mt-2 block text-ink hover:text-terracotta"
            >
              (865) 771-1487
            </a>

            <GoogleMap className="mt-6 h-56" />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">
              REGULAR HOURS
            </p>
            <dl className="mt-2 space-y-1">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted-foreground">{h.day}</dt>
                  <dd className="text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              July & August: extended to 9 am – 6 pm, plus Shop Hop Sundays
              July 26 & Aug 23 (11 am – 4 pm).
            </p>
          </div>

          <div id="contact">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">
              CONTACT US
            </p>
            <p className="mt-2 text-ink">Have a question? Say hello.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Looking for a specific fabric? Wondering about a class or
              upcoming event? Drop us a line and we&apos;ll get right back to
              you.
            </p>
            <form className="mt-4 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-ink placeholder:text-muted-foreground"
              />
              <textarea
                placeholder="Your message"
                rows={3}
                className="rounded-2xl border border-border bg-background px-4 py-2 text-sm text-ink placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="self-start rounded-full bg-terracotta px-6 py-2 text-sm font-semibold text-cream transition-colors hover:opacity-90"
              >
                Submit
              </button>
            </form>

            <div className="mt-8 rounded-2xl bg-cream p-5">
              <p className="font-medium text-ink">Join the list.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe for monthly sales, new arrivals, and heads-ups on
                special events like Shop Hop weekends.
              </p>
              <form className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-ink placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream transition-colors hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="border-t border-border bg-cream">
        <Reveal className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-10">
          <QuoteMark className="absolute left-1/2 top-4 -translate-x-1/2 text-[9rem] sm:text-[11rem]" />
          <p className="relative text-xs font-semibold tracking-widest text-terracotta">
            REVIEWS
          </p>
          <p className="relative mt-4 font-display text-2xl text-ink sm:text-3xl">
            &ldquo;A treasure of a fabric shop — worth the drive.&rdquo;
          </p>
        </Reveal>
      </section>
    </>
  );
}
