import { buildOgImage, OG_SIZE } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "About Deep Springs Discount Fabrics";

export default function Image() {
  return buildOgImage(
    "About the Shop",
    "A down home shop, run by folks who love the stuff.",
    "Family-run, tucked into the hills of East Tennessee."
  );
}
