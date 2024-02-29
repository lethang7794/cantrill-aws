const tagRegex = /(\[(\s*\w*[-/&,']*\w*)*\]\s*-*)|(\s*\(\d+:\d+\))/gi;
export function CourseTitle({
  titleWithDuration,
}: {
  titleWithDuration: string;
}) {
  return <div>{titleWithDuration.replaceAll(tagRegex, "")}</div>;
}
