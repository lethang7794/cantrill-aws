"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/context/app.context";

export function ToggleShowTag() {
  const { state, dispatch } = useApp();

  return (
    <div>
      <Checkbox
        checked={state.showTag}
        onCheckedChange={(event) => {
          dispatch({ type: "set-show-tag", payload: Boolean(event) });
        }}
      />{" "}
      Show Lecture Tags
    </div>
  );
}
