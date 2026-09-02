import { CLIENTS } from "@/data/site";

export default function Marquee() {
  const clients = [...CLIENTS, ...CLIENTS];

  return (
    <div className="marquee overflow-hidden border-y border-ink/16 bg-white" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {clients.map((client, index) => (
          <span
            className="whitespace-nowrap px-[26px] py-4 font-stretch-[112%] text-[.92rem] font-extrabold tracking-[.06em] text-ink/62 uppercase"
            key={`${client}-${index}`}
          >
            {client}
            <span className="ml-[26px] text-acc">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
