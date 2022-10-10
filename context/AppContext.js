import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [appState, setAppState] = useState({
    githubToken: "",
    user: "",
    projectOwner: "",
    projectNumber: 0,
    projectId: "",
    projectTitle: "",
  });
  const contextValue = useMemo(() => {
    return [appState, setAppState];
  }, [appState, setAppState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
