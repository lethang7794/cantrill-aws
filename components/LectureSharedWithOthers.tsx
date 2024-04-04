"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { COURSES, COURSE_CODES, CourseCode } from "@/constants/courses";
import { useApp } from "@/context/app.context";

function SharedWith({
  sharedWith,
  target,
  cur,
}: {
  sharedWith: Record<CourseCode, string>;
  target: CourseCode;
  cur: CourseCode;
}) {
  return (
    <div
      className={cn(
        "mt-1 font-semibold text-xs min-w-8 text-center text-[#3638EE]",
        cur == target && "font-bold underline"
      )}
      style={{ color: COURSES[target].color }}
    >
      {sharedWith[target] || cur == target ? COURSES[target].name : null}
    </div>
  );
}

export function LectureSharedWithOthers({
  sharedWith,
  cur,
}: {
  sharedWith: Record<CourseCode, string>;
  cur: CourseCode;
}) {
  const { state, dispatch } = useApp();

  function shouldShowCourse(code: string) {
    return state?.courses?.includes(code) || code == cur;
  }

  return (
    <>
      {COURSE_CODES.map(
        (c) =>
          shouldShowCourse(c) && (
            <SharedWith key={c} sharedWith={sharedWith} cur={cur} target={c} />
          )
      )}
      <Separator orientation="vertical" className="min-h-8 -mr-2 -my-2" />
    </>
  );
}
