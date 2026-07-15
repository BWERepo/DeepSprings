import { buildOgImage, OG_SIZE } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Deep Springs Discount Fabrics — Dandridge, Tennessee";

export default function Image() {
  return buildOgImage(
    "Dandridge, Tennessee",
    "Quality 100% cotton quilting & crafting fabrics.",
    "Discount prices. Walk-ins welcome, Monday through Saturday."
  );
}
