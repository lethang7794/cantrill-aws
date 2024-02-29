import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { promises as fs } from "fs";
import { Cloud, ListTodo, NotebookPen, PlaySquare } from "lucide-react";
import { cache } from "react";

export default async function Home() {
  const data = await getCourses();
  const certification = data.associate[0];
  const lectures = certification.lectures;
  const lecturesArr = Object.entries(lectures);

  const sections = certification.sections;

  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-24 gap-4">
      {/* {lecturesArr.map((val) => (
        <div key={val[0]}>{val[1].titleWithDuration}</div>
      ))} */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl">
          {`${certification.title} (${certification.code.toUpperCase()})`}
        </h1>
        <div>{getCourseTimeHeader(certification)}</div>
      </div>
      {sections.map((s) => (
        <ul className="mb-8" key={s.title}>
          <div className="flex gap-4 mb-4">
            <div className="text-3xl">{s.title}</div>
            <div className="flex-grow"></div>
            {getSectionTimeHeader(s)}
          </div>
          <ul className="flex flex-col gap-2">
            {s.lectures.map((l) => (
              <li className="flex gap-4" key={l.titleWithDuration}>
                <div className="w-5">{getLectureIcon(l)}</div>
                <div className="font-semibold">
                  {l.titleWithDuration.replaceAll(tagRegex, "")}
                </div>
                <div className="flex-grow"></div>
                <div className="flex gap-2">
                  {l.tags.map((t) => (
                    <Badge
                      variant="outline"
                      className="h-min capitalize w-min break-keep"
                    >
                      {t
                        .replaceAll(squareBracesRegex, "")
                        .toUpperCase()
                        .replaceAll("ASSOCIATESHARED", "ASSOCIATE")
                        .replaceAll("SHAREDALL", "ALL")}
                    </Badge>
                  ))}
                </div>
                {getShareWith(l, certification.code)}
                {getLectureTime(l)}
              </li>
            ))}
          </ul>
        </ul>
      ))}
    </main>
  );
}

const getCourses = cache(async () => {
  const file = await fs.readFile(process.cwd() + "/app/courses.json", "utf8");
  const data = JSON.parse(file);
  return data;
});

function getCourseTimeHeader(c) {
  return (
    <>
      {/* <div className="font-mono w-20 text-right">
        {s.duration.theory.hhmmss}
      </div>
      <div className="font-mono w-20 text-right">{s.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {c.duration.total.hhmmss}
      </div>
    </>
  );
}

function getSectionTimeHeader(s) {
  return (
    <>
      {/* <div className="font-mono w-20 text-right">
        {s.duration.theory.hhmmss}
      </div>
      <div className="font-mono w-20 text-right">{s.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {s.duration.total.hhmmss}
      </div>
    </>
  );
}

function getLectureTime(l: any) {
  return (
    <>
      {/* <div className="font-mono w-20 text-right">
        {l.isTheory && l.duration ? convertTime(l.duration) : null}
      </div>
      <div className="font-mono w-20 text-right">
        {!l.isTheory && l.duration ? convertTime(l.duration) : null}
      </div> */}
      <div className="font-mono min-w-20 text-right">
        {l.duration ? convertTime(l.duration) : null}
      </div>
    </>
  );
}

function isDemo(l: any): boolean {
  return l.titleWithDuration.match(/demo/gi);
}

function getLectureIcon(l: any) {
  if (l.isQuiz) return <ListTodo />;
  if (isDemo(l)) return <Cloud />;
  if (l.isVideo) return <PlaySquare />;
  return <NotebookPen />;
}

function convertTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

const tagRegex = /(\[\s*\w*-*\w*\]\s*-*)|(\s*\(\d+:\d+\))/gi;
const squareBracesRegex = /\[|\]/gi;

function getShareWith(l: any, cur: string) {
  return (
    <>
      <div
        className={cn("text-xs min-w-8", cur == "saa-c03" && "font-semibold")}
      >
        {l.sharedWith["saa-c03"] || cur == "saa-c03" ? "SAA" : null}
      </div>
      <div
        className={cn("text-xs min-w-8", cur == "dva-c02" && "font-semibold")}
      >
        {l.sharedWith["dva-c02"] || cur == "dva-c02" ? "DVA" : null}
      </div>
      <div
        className={cn("text-xs min-w-8", cur == "soa-c02" && "font-semibold")}
      >
        {l.sharedWith["soa-c02"] || cur == "soa-c02" ? "SOA" : null}
      </div>
      <div
        className={cn("text-xs min-w-8", cur == "sap-c02" && "font-semibold")}
      >
        {l.sharedWith["sap-c02"] || cur == "sap-c02" ? "SAP" : null}
      </div>
      <div
        className={cn("text-xs min-w-8", cur == "ans-c01" && "font-semibold")}
      >
        {l.sharedWith["ans-c01"] || cur == "ans-c01" ? "ANS" : null}
      </div>
      <div
        className={cn("text-xs min-w-8", cur == "scs-c01" && "font-semibold")}
      >
        {l.sharedWith["scs-c01"] || cur == "scs-c01" ? "SCS" : null}
      </div>
    </>
  );
}
