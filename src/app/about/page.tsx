import Image from "next/image";
import type { Metadata } from "next";
import GoogleMap from "@/components/GoogleMap";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Deep Springs Discount Fabrics",
  description:
    "A down home, family-run fabric shop tucked into the hills of East Tennessee. Quality 100% cotton quilting and crafting fabrics, priced so you can afford to be generous.",
  openGraph: {
    title: "About — Deep Springs Discount Fabrics",
    description:
      "A down home, family-run fabric shop tucked into the hills of East Tennessee.",
    url: "/about",
  },
};

const FACTS = [
  { value: "100%", label: "Cotton, always" },
  { value: "6 days", label: "Open Monday through Saturday" },
  { value: "1 shop", label: "In the hills of Dandridge, TN" },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-14 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest text-terracotta">
            ABOUT THE SHOP
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            A down home shop, run by folks who love the stuff.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Deep Springs Discount Fabrics is tucked into the hills of East
            Tennessee — a small, family-run shop with an ever-changing stock
            of quality 100% cotton quilting and crafting fabrics, priced so
            you can afford to be generous with your next project.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              OUR STORY
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Fabric at a fair price, and time to browse.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We opened Deep Springs because good cotton shouldn&apos;t be a
              luxury. Whether you&apos;re stitching your first quilt block or
              finishing a family heirloom, the fabric you pick matters — and
              so does the price on the bolt.
            </p>
            <p className="mt-4 text-muted-foreground">
              Come in and take your time. Pull down anything that catches
              your eye. Ask questions. Trade tips with whoever&apos;s at the
              cutting counter. We built this place to feel more like a
              friend&apos;s sewing room than a big-box store.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <p className="font-display text-2xl text-terracotta">
                    {f.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="group relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/images/bolts--HVoKAQT.jpg"
                alt="Rows of folded cotton fabric bolts"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Reveal>
          <div className="rounded-3xl bg-cream p-10 text-center sm:p-16">
            <p className="text-xs font-semibold tracking-widest text-terracotta">
              COME SAY HELLO
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Walk-ins are always welcome.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              786 Haynes Road, Dandridge, TN 37725. Open Monday through
              Saturday, 10 am – 6 pm (extended hours in July and August).
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="tel:8657711487"
                className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
              >
                Call (865) 771-1487
              </a>
              <a
                href="/sales"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-terracotta hover:text-terracotta"
              >
                This month&apos;s sales
              </a>
            </div>

            <GoogleMap className="mx-auto mt-10 h-72 max-w-2xl" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
