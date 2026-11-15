"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const Ctx = createContext<{ say: (m: string) => void }>({ say: () => {} });
export const useNote = () => useContext(Ctx);

/** Polite live-region note for destinations that aren't built yet. */
export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const t = useRef<ReturnType<typeof setTimeout>>();
  const say = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(t.current);
    t.current = setTimeout(() => setMsg(""), 3200);
  }, []);
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <Ctx.Provider value={{ say }}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed left-1/2 z-50 -translate-x-1/2 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+14px)] lg:bottom-6">
        {msg && <p className="border border-ink bg-paper px-4 py-2 text-sm text-ink">{msg}</p>}
      </div>
    </Ctx.Provider>
  );
}
