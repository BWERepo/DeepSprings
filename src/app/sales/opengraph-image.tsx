import { buildOgImage, OG_SIZE } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Monthly Sales & Calendar — Deep Springs Discount Fabrics";

export default function Image() {
  return buildOgImage(
    "Right Now",
    "Monthly sales & the shop calendar.",
    "$1 off per yard storewide during the All KY/TN Shop Hop."
  );
}
