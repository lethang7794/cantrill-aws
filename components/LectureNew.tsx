"use client";

import { useApp } from "@/context/app.context";
import type { CourseCode } from "@/constants/courses";

export function LectureNew({
  sharedWith,
  cur,
}: {
  sharedWith: Record<CourseCode, string>;
  cur: CourseCode;
}) {
  const { state } = useApp();

  const selectedCourses = state?.courses || [];
  const otherSelectedCourses = selectedCourses.filter((c) => c !== cur);

  function isNewLecture(cur: CourseCode, otherSelectedCourses: string[]) {
    for (const course of otherSelectedCourses) {
      if (sharedWith[course as CourseCode]) {
        return false;
      }
    }
    return true;
  }

  return otherSelectedCourses.length > 0 &&
    isNewLecture(cur, otherSelectedCourses) ? (
    <div style={{ fontSize: 24, height: 24 }} className="ml-2 -mt-2">
      🆕
    </div>
  ) : (
    <div style={{ fontSize: 24, height: 24 }} className="ml-2 -mt-2 invisible">
      ✔️
    </div>
  );
}
