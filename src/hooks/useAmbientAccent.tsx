import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface Accent {
  from: string;
  to: string;
}

interface AmbientAccentValue {
  accent: Accent | null;
  setAccent: (accent: Accent | null) => void;
}

const AmbientAccentContext = createContext<AmbientAccentValue | null>(null);

/**
 * Holds the "currently hovered athlete" accent pair so distant components
 * (a card in the grid, the fixed background field) can stay in sync without
 * threading callbacks through every layer of the tree.
 */
export function AmbientAccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<Accent | null>(null);
  const value = useMemo(() => ({ accent, setAccent }), [accent]);
  return (
    <AmbientAccentContext.Provider value={value}>
      {children}
    </AmbientAccentContext.Provider>
  );
}

export function useAmbientAccent() {
  const ctx = useContext(AmbientAccentContext);
  if (!ctx) {
    throw new Error("useAmbientAccent must be used within AmbientAccentProvider");
  }
  return ctx;
}
