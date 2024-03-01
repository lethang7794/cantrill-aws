import { convertTime } from "@/lib/lecture";
import { cn } from "@/lib/utils";
import { TimeTooltip } from "./TimeTooltip";

export function LectureTime({
  lecture,
  isDemo,
}: {
  lecture: any;
  isDemo: boolean;
}) {
  return (
    <>
      <TimeTooltip tooltip="Lecture duration (hh:ss)">
        <div
          className={cn("font-mono min-w-20 text-right", {
            "text-[#FF9900]": isDemo,
          })}
        >
          {lecture.duration ? convertTime(lecture.duration) : null}
        </div>
      </TimeTooltip>
    </>
  );
}
