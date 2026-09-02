import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className={`mx-auto max-w-(--maxw) px-(--pad) ${className}`} {...props}>
      {children}
    </div>
  );
}
