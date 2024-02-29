import { Cloud, ListTodo, NotebookPen, Youtube } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { isDemoLecture } from "@/lib/lecture";

const LectureIconWrapper = ({ children }: PropsWithChildren) => (
  <div className="w-5">{children}</div>
);

export function LectureIcon({ lecture }: { lecture: Record<string, any> }) {
  let icon = <NotebookPen />;
  if (lecture?.isQuiz) {
    icon = <ListTodo />;
  } else if (isDemoLecture(lecture as any)) {
    icon = <Cloud color="#FF9900" />;
  } else if (lecture.isVideo) {
    icon = <Youtube color="#FF0000" />;
  }
  return <LectureIconWrapper>{icon}</LectureIconWrapper>;
}
