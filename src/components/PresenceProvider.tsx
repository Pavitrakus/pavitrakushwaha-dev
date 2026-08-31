"use client";

import {
  createContext,
  useCallback,
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
  youPlace: string | null;
  youAreHere: boolean;
  ready: boolean;
};

type PresenceContextValue = PresenceState & {
  dismissYou: () => void;
};

const PresenceContext = createContext<PresenceContextValue | null>(null);

const initial: PresenceState = {
  siteViews: null,
  pageViews: null,
  lastPlace: null,
  youPlace: null,
  youAreHere: false,
  ready: false,
};

export function PresenceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<PresenceState>(initial);

  const dismissYou = useCallback(() => {
    setState((s) => ({ ...s, youAreHere: false, youPlace: null }));
  }, []);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/api")) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setState({
          siteViews: data.siteViews ?? null,
          pageViews: data.pageViews ?? null,
          lastPlace: data.lastPlace ?? null,
          youPlace: data.youAreHere ? data.youPlace ?? null : null,
          youAreHere: !!data.youAreHere && !!data.youPlace,
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

  const value = useMemo(
    () => ({ ...state, dismissYou }),
    [state, dismissYou],
  );

  return (
    <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
  );
}

export function usePresence() {
  const ctx = useContext(PresenceContext);
  if (!ctx) {
    return {
      ...initial,
      dismissYou: () => {},
    };
  }
  return ctx;
}
