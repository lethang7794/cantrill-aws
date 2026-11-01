"use client";

import * as React from "react";
import {
  initialState,
  readAppState,
  saveAppState,
  type AppState,
} from "@/lib/app-state";

type Action =
  | { type: "restore"; payload: AppState }
  | { type: "set-show-tag"; payload: boolean }
  | { type: "set-courses"; payload: string[] };
type Dispatch = (action: Action) => void;
type State = AppState;
type AppProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case "restore":
      return action.payload;
    case "set-show-tag": {
      const nextState = { ...state, showTag: action.payload };
      return nextState;
    }
    case "set-courses": {
      const nextState = { ...state, courses: action.payload };
      return nextState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const [restored, setRestored] = React.useState(false);
  React.useEffect(() => {
    dispatch({
      type: "restore",
      payload: readAppState(new URLSearchParams(window.location.search)),
    });
    setRestored(true);
  }, []);
  React.useEffect(() => {
    if (restored) saveAppState(state);
  }, [state, restored]);

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
