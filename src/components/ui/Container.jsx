export default function Container({
  children,
  className = "",
  ...props
}) {
  return (
    <div className={`mx-auto max-w-(--maxw) px-(--pad) ${className}`} {...props}>
      {children}
    </div>
  );
}
