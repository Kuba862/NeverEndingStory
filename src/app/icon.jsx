import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
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
          borderRadius: 8,
          background: "#2B0E13",
          color: "#E0762A",
          fontFamily: "Arial, sans-serif",
          fontSize: 15,
          fontWeight: 900,
        }}
      >
        ns
      </div>
    ),
    size,
  );
}
