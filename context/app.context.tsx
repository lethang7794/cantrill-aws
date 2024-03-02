"use client";

import * as React from "react";
import { LOCAL_STORAGE_APP_STATE_KEY } from "@/constants/localStorage";

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
      const nextState = { ...state, showTag: action.payload };
      setLocalStorage(nextState);
      return nextState;
    }
    case "set-courses": {
      const nextState = { ...state, courses: action.payload };
      setLocalStorage(nextState);
      return nextState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initState: State = {
  showTag: true,
  courses: [],
};

function setLocalStorage(state: State) {
  window.localStorage.setItem(
    LOCAL_STORAGE_APP_STATE_KEY,
    JSON.stringify(state)
  );
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, initState, () => {
    if (typeof window == "undefined") return;
    const stickyValue = window.localStorage.getItem(
      LOCAL_STORAGE_APP_STATE_KEY
    );
    return stickyValue !== null ? JSON.parse(stickyValue) : initState;
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
