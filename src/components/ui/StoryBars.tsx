export default function StoryBars() {
  return (
    <span
      className="absolute top-3 right-3 left-3 z-[3] flex gap-1.5"
      aria-hidden="true"
    >
      <i className="h-[3px] flex-1 rounded-full bg-acc" />
      <i className="h-[3px] flex-1 rounded-full bg-white/45" />
      <i className="h-[3px] flex-1 rounded-full bg-white/45" />
    </span>
  );
}
