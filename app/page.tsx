import { promises as fs } from "fs";
import { ListTodo, NotebookPen, Video } from "lucide-react";

export default async function Home() {
  console.log("Hello");
  const file = await fs.readFile(process.cwd() + "/app/courses.json", "utf8");
  const data = JSON.parse(file);
  let lectures = data.associate[0].lectures;
  let lecturesArr = Object.entries(lectures);

  let sections = data.associate[0].sections;
  console.log(sections);

  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-24">
      {/* {lecturesArr.map((val) => (
        <div key={val[0]}>{val[1].titleWithDuration}</div>
      ))} */}
      {sections.map((s) => (
        <ul className="mb-4" key={s.title}>
          <div className="text-3xl">{s.title}</div>
          <ul>
            {s.lectures.map((l) => (
              <li className="flex gap-2" key={l.titleWithDuration}>
                <div>{getLectureIcon(l)}</div>
                <div>{l.titleWithDuration}</div>
                <div className="flex-grow"></div>
                <div className="font-mono">
                  {l.duration ? convertTime(l.duration) : null}
                </div>
              </li>
            ))}
          </ul>
        </ul>
      ))}
    </main>
  );
}
function getLectureIcon(l: any) {
  if (l.isQuiz) return <ListTodo />;
  if (l.isVideo) return <Video />;
  return <NotebookPen />;
}

function convertTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}
