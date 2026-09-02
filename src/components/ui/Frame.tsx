import Image from "next/image";
import type { ReactNode } from "react";
import StoryBars from "./StoryBars";

type FrameAspect =
  | "1/1"
  | "3/4"
  | "4/3"
  | "4/4.2"
  | "4/4.4"
  | "4/4.6"
  | "4/4.8"
  | "4/5"
  | "9/16";

const aspectClasses: Record<FrameAspect, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "4/4.2": "aspect-[4/4.2]",
  "4/4.4": "aspect-[4/4.4]",
  "4/4.6": "aspect-[4/4.6]",
  "4/4.8": "aspect-[4/4.8]",
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
};

type FrameProps = {
  src: string;
  alt: string;
  aspect: FrameAspect;
  sizes: string;
  chip?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
};

export default function Frame({
  src,
  alt,
  aspect,
  sizes,
  chip,
  priority = false,
  className = "",
  imageClassName = "",
  children,
}: FrameProps) {
  return (
    <span
      className={`relative block overflow-hidden rounded-media bg-wine ${aspectClasses[aspect]} ${className}`}
    >
      <StoryBars />
      <Image
        src={src}
        alt={alt}
        fill
        preload={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
      {children}
      {chip ? (
        <span className="absolute bottom-3 left-3 z-[3] rounded-full bg-white/92 px-3.5 py-[7px] text-[.78rem] font-[650] tracking-[.02em] backdrop-blur-sm">
          {chip}
        </span>
      ) : null}
    </span>
  );
}
