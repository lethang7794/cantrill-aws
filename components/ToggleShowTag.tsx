"use client";

import { useApp } from "@/context/app.context";
import { Switch } from "./ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export function ToggleShowTag() {
  const { state, dispatch } = useApp();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-2">
          <Switch
            checked={state.showTag}
            onCheckedChange={(event) => {
              dispatch({ type: "set-show-tag", payload: Boolean(event) });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
