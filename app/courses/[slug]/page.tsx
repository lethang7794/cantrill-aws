import { coursesByKey, getFlatCourses } from "@/lib/getCourses";
import { Metadata, ResolvingMetadata } from "next";
import { LectureSharedWithOthers } from "@/components/LectureSharedWithOthers";
import { LectureTags } from "@/components/LectureTags";
import { LectureIcon } from "@/components/LectureIcon";
import { LectureTitle } from "@/components/LectureTitle";
import { SectionTime } from "@/components/SectionTime";
import { LectureTime } from "@/components/LectureTime";
import { CourseTime } from "@/components/CourseTime";
import { CourseTitle } from "@/components/CourseTitle";
import { isDemoLecture } from "@/lib/lecture";
import { CertificationBadge } from "@/components/CertificationBadge";
import { SettingTag } from "@/components/SettingTag";
import { Suspense } from "react";
import { SyncSharedCoursesParam } from "@/components/SyncSharedCoursesParam";
import { SettingCoursesShared } from "@/components/SettingCoursesShared";

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
  const slug = params.slug.toLowerCase();
  const course = courses[slug];
  if (!course) {
    return <>Not Found</>;
  }

  const sections = course.sections;
  return (
    <>
      <Suspense fallback={null}>
        <SyncSharedCoursesParam />
      </Suspense>
      <div className="z-10 sticky top-0 bg-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between border-b p-2">
          <CertificationBadge code={course.code} />
          <CourseTitle course={course} />
          <div>
            <CourseTime course={course} />
          </div>
        </div>
      </div>
      <div className="pt-8 flex flex-wrap gap-4 justify-center">
        <SettingTag />
        <SettingCoursesShared currentCourse={slug as any} />
      </div>
      {sections.map((s: any, idx: any) => (
        <ul className="my-8" key={s.title}>
          <div className="sticky top-[73px] bg-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex gap-4 mb-4 py-1 border-b px-2">
              <div className="text-3xl font-semibold line-clamp-1 lg:line-clamp-2">{`${idx + 1}. ${
                s.title
              }`}</div>
              <div className="flex-grow"></div>
              <SectionTime
                section={s}
                side={idx === 0 ? "bottom" : undefined}
              />
            </div>
          </div>
          <ul className="flex flex-col gap-4 px-2">
            {s.lectures.map((l: any) => {
              let isDemo = isDemoLecture(l);
              return (
                <li className="flex gap-4" key={l.titleWithDuration}>
                  <LectureIcon lecture={l} />
                  <LectureTitle titleWithDuration={l.titleWithDuration} />
                  <div className="flex-grow"></div>
                  <LectureTags tags={l.tags} />
                  <div></div>
                  <LectureSharedWithOthers
                    sharedWith={l.sharedWith}
                    cur={course.code}
                  />
                  <LectureTime lecture={l} isDemo={isDemo} />
                </li>
              );
            })}
          </ul>
        </ul>
      ))}
    </>
  );
}
