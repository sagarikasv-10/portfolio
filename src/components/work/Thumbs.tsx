import type { WorkItem } from "@/content/site";

/**
 * Placeholder product previews, drawn in HTML/CSS. They are decorative (aria-hidden) and only shown while a card's
 * `image` is null in content/site.ts. Swap in final mockups there; nothing else needs to change.
 */
const shell = "absolute inset-0 flex items-center justify-center overflow-hidden pb-5";

function Rhythms() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={`${shell} bg-[#E9D9B8]`}>
      <div className="w-[158px] rounded-[18px] border border-[#1A1A1A]/20 bg-[#FAF6EE] p-3 shadow-[0_8px_18px_rgba(60,40,10,0.14)]">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E8B866]">
            <span className="h-3 w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[#9E5B3C]" />
          </span>
          <span className="space-y-1">
            <span className="block h-1.5 w-16 rounded bg-[#1A1A1A]/70" />
            <span className="block h-1.5 w-10 rounded bg-[#1A1A1A]/25" />
          </span>
        </div>
        <div className="mt-3 flex justify-between">
          {days.map((d, i) => (
            <span key={i} className={`grid h-[15px] w-[15px] place-items-center rounded-full text-[7px] font-semibold ${i < 5 ? "bg-[#9E5B3C] text-white" : "border border-[#1A1A1A]/25 text-[#1A1A1A]/50"}`}>{d}</span>
          ))}
        </div>
        <span className="mt-3 block rounded-full bg-[#2A2420] py-1.5 text-center text-[8px] font-semibold tracking-wide text-[#F4EFE6]">Begin today&rsquo;s aarti</span>
      </div>
    </div>
  );
}

function Access() {
  const rows = [["w-20", true], ["w-24", false], ["w-16", true]] as const;
  return (
    <div className={`${shell} bg-[#D5DEDF]`}>
      <div className="w-[176px] rounded-2xl border border-[#1A1A1A]/20 bg-[#FAF6EE] p-3 shadow-[0_8px_18px_rgba(30,50,60,0.14)]">
        <span className="mb-2 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-[3px] bg-[#4F6B6E]" />
          <span className="h-1.5 w-14 rounded bg-[#1A1A1A]/70" />
        </span>
        {rows.map(([w, on], i) => (
          <div key={i} className="flex items-center justify-between border-t border-[#1A1A1A]/10 py-2">
            <span className={`h-1.5 rounded ${w} bg-[#1A1A1A]/35`} />
            <span className={`flex h-[14px] w-6 items-center rounded-full px-[2px] ${on ? "justify-end bg-[#4F6B6E]" : "justify-start bg-[#1A1A1A]/20"}`}>
              <span className="h-[10px] w-[10px] rounded-full bg-white" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function System() {
  const tiles = ["#E8B866", "#9E5B3C", "#C9D1A8", "#2A2420", "#D9A7A0", "#8FA9B5"];
  return (
    <div className={`${shell} bg-[#E6DDEB]`}>
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#1A1A1A]/20 bg-[#FAF6EE] p-2.5 shadow-[0_8px_18px_rgba(60,40,70,0.14)]">
        {tiles.map((c, i) => (
          <span key={i} className="relative block h-[46px] w-[44px] overflow-hidden rounded-md" style={{ background: c }}>
            <span className="absolute inset-x-1.5 bottom-1.5 h-1 rounded bg-white/70" />
            <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Thumb({ id }: { id: WorkItem["id"] }) {
  return <div aria-hidden>{id === "rhythms" ? <Rhythms /> : id === "access" ? <Access /> : <System />}</div>;
}
