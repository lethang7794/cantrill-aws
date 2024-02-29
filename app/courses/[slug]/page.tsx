import { getFlatCourses, coursesByKey } from "@/lib/getCourses";

export async function generateStaticParams() {
  const flatCourses = await getFlatCourses();

  return flatCourses.map((course) => ({
    slug: course.code,
  }));
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const courses = await coursesByKey();
  const c = courses[params.slug];

  return (
    <h1>
      <div>Course: {params.slug}</div>
      <div>{c.title}</div>
    </h1>
  );
}
