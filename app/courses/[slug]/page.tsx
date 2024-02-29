import { getFlatCourses, coursesByKey } from "@/lib/getCourses";
import { Metadata, ResolvingMetadata } from "next";
import { SharedWithOthers } from "@/components/SharedWithOthers";
import { CourseTags } from "@/components/CourseTags";
import { LectureIcon } from "@/components/LectureIcon";
import { CourseTitle } from "@/components/CourseTitle";

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
  if (!certification) {
    return { title: "Not Found" };
  }

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
              <img
                src={`/aws/${certification.code.slice(0, 3).toUpperCase()}.png`}
                alt=""
                width={56}
                height={56}
              />
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
                    <LectureIcon lecture={l} />
                    <CourseTitle titleWithDuration={l.titleWithDuration} />
                    <div className="flex-grow"></div>
                    <CourseTags tags={l.tags} />
                    <div></div>
                    <SharedWithOthers
                      sharedWith={l.sharedWith}
                      cur={certification.code}
                    />
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

function convertTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}

export const squareBracesRegex = /\[|\]/gi;
