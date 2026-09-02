export default function Display({
  as: Component = "h2",
  children,
  className = "",
  id,
}) {
  return (
    <Component
      id={id}
      className={`font-stretch-[118%] font-[850] uppercase leading-[.98] tracking-[.004em] ${className}`}
    >
      {children}
    </Component>
  );
}
