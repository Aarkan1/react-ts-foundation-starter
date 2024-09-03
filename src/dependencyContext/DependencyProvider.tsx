import React, { useState, useContext, createContext, ReactNode } from "react";
import { logService } from "./logService";
import { LogService } from "./types";

interface DependencyProviderProps {
  children: ReactNode;
}

interface DependencyContext {
  shouldLog: boolean;
  setShouldLog: React.Dispatch<React.SetStateAction<boolean>>;
  logService: LogService;
}

export const DependencyContext = createContext<DependencyContext>(
  {} as DependencyContext
);

export const useDependency = (): DependencyContext => {
  return useContext(DependencyContext);
};

const DependencyProvider = ({
  children,
}: DependencyProviderProps): JSX.Element => {
  const [shouldLog, setShouldLog] = useState(true);

  const value: DependencyContext = {
    shouldLog,
    setShouldLog,
    logService,
  };

  return (
    <DependencyContext.Provider value={value}>
      {children}
    </DependencyContext.Provider>
  );
};

export default DependencyProvider;
