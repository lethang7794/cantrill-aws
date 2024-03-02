const lectureNameRegex = /(\[(\s*\w*[-/&,']*\w*)*\]\s*-*)|(\s*\(\d+:\d+\))/gi;

export function LectureTitle({
  titleWithDuration,
}: {
  titleWithDuration: string;
}) {
  return (
    <div className="min-w-10">
      {titleWithDuration.replaceAll(lectureNameRegex, "")}
    </div>
  );
}
