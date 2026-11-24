import type { WorkItem } from "@/content/site";

/** The rounded category pill, shared by the homepage project cards and the case study headers. */
export const PILL_CLASS = "pill inline-block self-start rounded-full border border-[#8C6D3F]/25 bg-[#EFE4CE] px-3 py-1 text-xs font-medium text-[#5C4928]";

/** Night-mode jewel tone for each category pill. */
export const TONE: Record<WorkItem["id"], string> = { rhythms: "amber", access: "teal", system: "lavender" };
