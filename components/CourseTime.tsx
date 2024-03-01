import { TimeTooltip } from "./TimeTooltip";

export function CourseTime({ course }: { course: any }) {
  return (
    <>
      <TimeTooltip
        tooltip={
          <div>
            <div>Course duration (hh:mm:ss)</div>
            <div>- Theory: {course.duration.theory.hhmmss}</div>
            <div>- Demo: {course.duration.demo.hhmmss}</div>
          </div>
        }
      >
        <div className="font-mono min-w-20 text-right">
          {course.duration.total.hhmmss}
        </div>
      </TimeTooltip>
    </>
  );
}
