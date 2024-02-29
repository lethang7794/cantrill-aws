import { ListTodo, Cloud, NotebookPen, Youtube } from "lucide-react";
import React, { PropsWithChildren } from "react";

function isDemo(l: { titleWithDuration: string }): boolean {
  let match = l.titleWithDuration.match(/demo/gi);
  return Boolean(match);
}

const LectureIconWrapper = ({ children }: PropsWithChildren) => (
  <div className="w-5">{children}</div>
);

export function LectureIcon({ lecture }: { lecture: Record<string, any> }) {
  let icon = <NotebookPen />;
  if (lecture?.isQuiz) {
    icon = <ListTodo />;
  }
  if (isDemo(lecture as any)) {
    icon = <Cloud color="#FF9900" />;
  }
  if (lecture.isVideo) {
    icon = <Youtube color="#FF0000" />;
  }
  return <LectureIconWrapper>{icon}</LectureIconWrapper>;
}
