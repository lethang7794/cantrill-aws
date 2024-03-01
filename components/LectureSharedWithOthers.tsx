"use client";

import { cn } from "@/lib/utils";
import { CertificationCode, SHARED_WITH } from "@/domain/certification";
import { useApp } from "@/context/app.context";
import { COURSES } from "@/constants/course";

function SharedWith({
  sharedWith,
  target,
  cur,
}: {
  sharedWith: Record<CertificationCode, string>;
  target: CertificationCode;
  cur: CertificationCode;
}) {
  return (
    <div
      className={cn(
        "font-semibold text-xs min-w-8 text-[#3638EE]",
        cur == target && "font-bold"
      )}
      style={{ color: SHARED_WITH[target].color }}
    >
      {sharedWith[target] || cur == target ? SHARED_WITH[target].name : null}
    </div>
  );
}

export function LectureSharedWithOthers({
  sharedWith,
  cur,
}: {
  sharedWith: Record<CertificationCode, string>;
  cur: CertificationCode;
}) {
  const { state, dispatch } = useApp();

  function shouldShowCourse(code: string) {
    return state.courses.includes(code) || code == cur;
  }

  return (
    <>
      {COURSES.map(
        (c) =>
          shouldShowCourse(c) && (
            <SharedWith key={c} sharedWith={sharedWith} cur={cur} target={c} />
          )
      )}
    </>
  );
}
