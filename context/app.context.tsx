"use client";

import * as React from "react";

type Action =
  | { type: "set-show-tag"; payload: boolean }
  | { type: "set-courses"; payload: string[] };
type Dispatch = (action: Action) => void;
type State = {
  showTag: boolean;
  courses: string[];
};
type AppProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case "set-show-tag": {
      return { ...state, showTag: action.payload };
    }
    case "set-courses": {
      return { ...state, courses: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, {
    showTag: true,
    courses: [],
  });

  const value = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  );
}

function useApp() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useApp };
