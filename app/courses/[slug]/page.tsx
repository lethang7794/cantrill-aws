import { Badge } from "@/components/ui/badge";
import { getFlatCourses, coursesByKey } from "@/lib/getCourses";
import { cn } from "@/lib/utils";
import { ListTodo, Cloud, PlaySquare, NotebookPen } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
  const flatCourses = await getFlatCourses();

  return flatCourses.map((course) => ({
    slug: course.code.toUpperCase(),
  }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const courses = await coursesByKey();
  const certification = courses[params.slug.toLowerCase()];

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const courseTitle = `${certification.code.toUpperCase()}: ${
    certification.title
  }`;
  return {
    title: courseTitle,
    openGraph: {
      // images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const courses = await coursesByKey();
  const certification = courses[params.slug.toLowerCase()];
  if (!certification) {
    return <>Not Found</>;
  }

  const sections = certification.sections;
  return (
    <>
      <main className="flex min-h-screen flex-col items-left justify-between p-16 gap-4">
        <div className="container">
          <div className="z-10 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h1 className="py-2 text-4xl font-semibold max-h-14 truncate">
                {`${certification.code.toUpperCase()}: ${certification.title}`}
              </h1>
              <div>{getCourseTimeHeader(certification)}</div>
            </div>
          </div>
          {sections.map((s: any, idx: any) => (
            <ul className="my-8" key={s.title}>
              <div className="sticky top-14 bg-white">
                <div className="flex gap-4 mb-4 pb-1">
                  <div className="text-3xl font-semibold">{`${idx + 1}. ${
                    s.title
                  }`}</div>
                  <div className="flex-grow"></div>
                  {getSectionTimeHeader(s)}
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {s.lectures.map((l: any) => (
                  <li
                    className="flex gap-4 items-center"
                    key={l.titleWithDuration}
                  >
                    <div className="w-5">{getLectureIcon(l)}</div>
                    <div className="">
                      {l.titleWithDuration.replaceAll(tagRegex, "")}
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {l.tags.map((t: any) => (
                        <Badge
                          variant="outline"
                          className="h-min capitalize w-fit break-keep"
                          key={t}
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
        </div>
      </main>
    </>
  );
}

function getCourseTimeHeader(c: any) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {s.duration.theory.hhmmss}
      </div>
      <div className="font-mono min-w-20 text-right">{s.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {c.duration.total.hhmmss}
      </div>
    </>
  );
}

function getSectionTimeHeader(s: any) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {s.duration.theory.hhmmss}
      </div>
      <div className="font-mono min-w-20 text-right">{s.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {s.duration.total.hhmmss}
      </div>
    </>
  );
}

function getLectureTime(l: any) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {l.isTheory && l.duration ? convertTime(l.duration) : null}
      </div>
      <div className="font-mono min-w-20 text-right">
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
