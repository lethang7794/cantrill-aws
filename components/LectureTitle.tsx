const lectureNameRegex = /(\[(\s*\w*[-/&,']*\w*)*\]\s*-*)|(\s*\(\d+:\d+\))/gi;

export function LectureTitle({
  titleWithDuration,
}: {
  titleWithDuration: string;
}) {
  return <div>{titleWithDuration.replaceAll(lectureNameRegex, "")}</div>;
}
