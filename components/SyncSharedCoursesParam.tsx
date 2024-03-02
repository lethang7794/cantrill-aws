"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/app.context";
import { PARAM_KEYS } from "@/constants/paramKeys";
import { COURSE_CODES } from "@/constants/courses";

export function SyncSharedCoursesParam() {
  const { dispatch } = useApp();
  const searchParams = useSearchParams();

  React.useLayoutEffect(() => {
    const courses = searchParams.get(PARAM_KEYS.sharedWith);
    const hasHideTag = searchParams.has(PARAM_KEYS.hideTag);

    const validCourses =
      courses
        ?.split(",")
        .map((c) => c.toLowerCase())
        .filter((c) => COURSE_CODES.includes(c as any)) || [];

    if (validCourses.length > 0) {
      dispatch({ type: "set-courses", payload: validCourses });
    }
    if (hasHideTag) {
      dispatch({ type: "set-show-tag", payload: false });
    }
  }, []);

  return null;
}
