import { convertTime } from "@/lib/lecture";
import { cn } from "@/lib/utils";

export function LectureTime({
  lecture,
  isDemo,
}: {
  lecture: any;
  isDemo: boolean;
}) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {lecture.isTheory && lecture.duration ? convertTime(lecture.duration) : null}
      </div>
      <div className="font-mono min-w-20 text-right">
        {!lecture.isTheory && lecture.duration ? convertTime(lecture.duration) : null}
      </div> */}
      <div
        className={cn("font-mono min-w-20 text-right", {
          "text-[#FF9900]": isDemo,
        })}
      >
        {lecture.duration ? convertTime(lecture.duration) : null}
      </div>
    </>
  );
}
