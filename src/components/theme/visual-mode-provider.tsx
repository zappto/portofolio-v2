"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type VisualMode } from "@/config/site";

type VisualModeContextValue = {
  visualMode: VisualMode;
  setVisualMode: (mode: VisualMode) => void;
  toggleVisualMode: () => void;
};

const VisualModeContext = createContext<VisualModeContextValue | null>(null);

type VisualModeProviderProps = {
  children: React.ReactNode;
  initialMode?: VisualMode;
};

export function VisualModeProvider({
  children,
  initialMode = "professional",
}: VisualModeProviderProps) {
  const [visualMode, setVisualModeState] = useState<VisualMode>(initialMode);

  const setVisualMode = useCallback((mode: VisualMode) => {
    setVisualModeState(mode);
  }, []);

  const toggleVisualMode = useCallback(() => {
    setVisualMode(visualMode === "professional" ? "playful" : "professional");
  }, [setVisualMode, visualMode]);

  useEffect(() => {
    document.documentElement.dataset.visualMode = visualMode;
    window.localStorage.setItem("visual-mode", visualMode);
    document.cookie = `visual-mode=${visualMode}; path=/; max-age=31536000; samesite=lax`;
  }, [visualMode]);

  const value = useMemo(
    () => ({ visualMode, setVisualMode, toggleVisualMode }),
    [setVisualMode, toggleVisualMode, visualMode],
  );

  return (
    <VisualModeContext.Provider value={value}>
      {children}
    </VisualModeContext.Provider>
  );
}

export function useVisualMode() {
  const context = useContext(VisualModeContext);

  if (!context) {
    throw new Error("useVisualMode must be used within VisualModeProvider");
  }

  return context;
}
