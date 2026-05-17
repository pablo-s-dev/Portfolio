"use client";

import { createContext, useContext, RefObject } from "react";

const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContext);
}

export function ScrollProvider({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: RefObject<HTMLDivElement>;
}) {
  return (
    <ScrollContext.Provider value={containerRef}>
      {children}
    </ScrollContext.Provider>
  );
}
