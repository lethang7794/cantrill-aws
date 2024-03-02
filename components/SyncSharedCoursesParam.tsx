"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { COURSES } from "@/constants/course";
import { useApp } from "@/context/app.context";
import { CertificationCode } from "@/domain/certification";
import { PARAM_KEYS } from "@/constants/paramKeys";

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
        .filter((c) => COURSES.includes(c as CertificationCode)) || [];

    if (validCourses.length > 0) {
      dispatch({ type: "set-courses", payload: validCourses });
    }
    if (hasHideTag) {
      dispatch({ type: "set-show-tag", payload: false });
    }
  }, []);

  return null;
}
