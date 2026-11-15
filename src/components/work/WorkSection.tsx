import { MoonHeader } from "@/components/MoonHeader";
import { CtaPair } from "@/components/CtaPair";
import { WORK } from "@/content/site";
import { WorkCard } from "./WorkCard";

/** Selected Work. */
export function WorkSection() {
  return (
    <section id={WORK.id} aria-labelledby="work-title" className="w-full scroll-mt-24 bg-paper">
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-14 lg:px-12 lg:pt-20">
        <MoonHeader id="work-title" title={WORK.title} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {WORK.items.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
        <CtaPair />
      </div>
    </section>
  );
}
