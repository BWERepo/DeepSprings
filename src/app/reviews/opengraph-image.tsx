import { buildOgImage, OG_SIZE } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Reviews — Deep Springs Discount Fabrics";

export default function Image() {
  return buildOgImage(
    "Reviews",
    "Kind words from folks who've stopped in.",
    "4.9 / 5 average rating from quilters and crafters."
  );
}
