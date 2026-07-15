import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#603b26",
          borderRadius: "50%",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#f7f0e4",
            fontFamily: "Georgia, serif",
          }}
        >
          D
        </span>
      </div>
    ),
    size
  );
}
