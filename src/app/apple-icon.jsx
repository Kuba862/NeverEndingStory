import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "#2B0E13",
        }}
      >
        <div style={{ display: "flex", gap: 8, width: 112 }}>
          <div style={{ height: 8, flex: 1, borderRadius: 999, background: "#E0762A" }} />
          <div style={{ height: 8, flex: 1, borderRadius: 999, background: "#FFFDF9" }} />
          <div style={{ height: 8, flex: 1, borderRadius: 999, background: "#FFFDF9" }} />
        </div>
        <div
          style={{
            color: "#E0762A",
            fontFamily: "Arial, sans-serif",
            fontSize: 54,
            fontWeight: 900,
          }}
        >
          ns
        </div>
      </div>
    ),
    size,
  );
}
