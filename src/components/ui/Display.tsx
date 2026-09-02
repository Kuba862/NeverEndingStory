import type { ReactNode } from "react";

type DisplayProps = {
  as?: "h1" | "h2" | "h3" | "span" | "div" | "button";
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Display({
  as: Component = "h2",
  children,
  className = "",
  id,
}: DisplayProps) {
  return (
    <Component
      id={id}
      className={`font-stretch-[118%] font-[850] uppercase leading-[.98] tracking-[.004em] ${className}`}
    >
      {children}
    </Component>
  );
}
