import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  size?: "base" | "sm";
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "ghost";
};

export default function Button({
  children,
  className = "",
  href,
  onClick,
  size = "base",
  type = "button",
  variant = "solid",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center gap-2.5 rounded-full font-bold tracking-[.01em] transition-[background,color,transform] duration-[180ms] hover:-translate-y-px",
    size === "sm" ? "px-[18px] py-2.5 text-[.88rem]" : "px-6 py-[13px] text-[.95rem]",
    variant === "ghost"
      ? "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-paper"
      : "bg-acc text-white hover:bg-acc-d",
    className,
  ].join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={classes}
    >
      {children}
    </button>
  );
}
