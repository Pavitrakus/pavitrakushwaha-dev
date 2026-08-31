"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

export type PresenceState = {
  siteViews: number | null;
  pageViews: number | null;
  lastPlace: string | null;
  ready: boolean;
};

const PresenceContext = createContext<PresenceState | null>(null);

const initial: PresenceState = {
  siteViews: null,
  pageViews: null,
  lastPlace: null,
  ready: false,
};

export function PresenceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<PresenceState>(initial);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/api")) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
          cache: "no-store",
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setState({
          siteViews: data.siteViews ?? null,
          pageViews: data.pageViews ?? null,
          lastPlace: data.lastPlace ?? null,
          ready: true,
        });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, ready: true }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const value = useMemo(() => state, [state]);

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresence() {
  return useContext(PresenceContext) ?? initial;
}
