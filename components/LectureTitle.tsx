const lectureNameRegex = /(\[(\s*\w*[-/&,']*\w*)*\]\s*-*)|(\s*\(\d+:\d+\))/gi;

export function LectureTitle({
  titleWithDuration,
}: {
  titleWithDuration: string;
}) {
  return (
    <div className="min-w-36 text-ellipsis overflow-hidden line-clamp-2 lg:line-clamp-none">
      {titleWithDuration.replaceAll(lectureNameRegex, "")}
    </div>
  );
}
