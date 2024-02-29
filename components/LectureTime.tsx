import { convertTime } from "@/app/lib/utils/lecture";

export function LectureTime({ lecture }: { lecture: any }) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {lecture.isTheory && lecture.duration ? convertTime(lecture.duration) : null}
      </div>
      <div className="font-mono min-w-20 text-right">
        {!lecture.isTheory && lecture.duration ? convertTime(lecture.duration) : null}
      </div> */}
      <div className="font-mono min-w-20 text-right">
        {lecture.duration ? convertTime(lecture.duration) : null}
      </div>
    </>
  );
}
