"use client";
import { createContext, ReactNode, useState } from "react";

export interface ManagerType {
  isManager: boolean;
  setIsManager: (b: boolean) => void;
}

export const ManagerContext = createContext<ManagerType>({
  isManager: false,
  setIsManager: (_: boolean) => {},
});

export default function ManagerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isManager, setIsManager] = useState(false);
  return (
    <ManagerContext.Provider
      value={{ isManager: isManager, setIsManager: setIsManager }}
    >
      {children}
    </ManagerContext.Provider>
  );
}
