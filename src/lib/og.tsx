import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function buildOgImage(eyebrow: string, title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#f7f0e0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            color: "#b5602f",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 64,
            lineHeight: 1.15,
            color: "#3a2a1f",
            maxWidth: 950,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#6b5a4a",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            fontSize: 24,
            fontFamily: "Arial, sans-serif",
            color: "#3a2a1f",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#603b26",
              color: "#f7f0e4",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontSize: 22,
              marginRight: 14,
            }}
          >
            D
          </div>
          Deep Springs Discount Fabrics
        </div>
      </div>
    ),
    OG_SIZE
  );
}
