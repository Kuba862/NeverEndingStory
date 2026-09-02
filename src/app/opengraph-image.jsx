import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const alt = OG_IMAGE_ALT;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FBF8F2",
          color: "#191410",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 290,
            background: "#E0762A",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 130,
            top: 0,
            bottom: 0,
            width: 64,
            background: "#FFFDF9",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 70,
            right: 70,
            display: "flex",
            gap: 12,
          }}
        >
          <div style={{ height: 9, flex: 1, borderRadius: 999, background: "#E0762A" }} />
          <div style={{ height: 9, flex: 1, borderRadius: 999, background: "#2B0E13" }} />
          <div style={{ height: 9, flex: 1, borderRadius: 999, background: "#2B0E13" }} />
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px 80px",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 700, color: "#B85A17", letterSpacing: 2 }}>
            agencja social media · Kraków
          </div>
          <div
            style={{
              marginTop: 22,
              maxWidth: 940,
              fontSize: 86,
              lineHeight: 0.98,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {SITE_TITLE}
          </div>
          <div style={{ marginTop: 30, maxWidth: 820, fontSize: 34, lineHeight: 1.35 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
