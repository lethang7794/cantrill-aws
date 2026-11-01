"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/app.context";
import { PARAM_KEYS } from "@/constants/paramKeys";
import { normalizeCourses } from "@/lib/app-state";

export function SyncSharedCoursesParam() {
  const { dispatch } = useApp();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const courses = searchParams.get(PARAM_KEYS.sharedWith);
    const hasHideTag = searchParams.has(PARAM_KEYS.hideTag);

    const validCourses = normalizeCourses(
      courses?.split(",").map((c) => c.trim().toLowerCase()),
    );

    if (courses !== null) {
      dispatch({ type: "set-courses", payload: validCourses });
    }
    if (hasHideTag) {
      dispatch({ type: "set-show-tag", payload: false });
    }
  }, [searchParams, dispatch]);

  return null;
}
