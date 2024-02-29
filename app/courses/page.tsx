import { getCourses } from "@/lib/getCourses";
import { titleCase } from "@/lib/string";
import React from "react";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      {Object.entries(courses).map(([level, levelCourse]) => {
        return (
          <React.Fragment key={level}>
            <div>Level: {titleCase(level)}</div>
            {(levelCourse as any[]).map((course) => {
              const code = course.code.toUpperCase();
              return (
                <a key={code} href={`/courses/${code}`}>
                  <div>
                    {course.title} ({code.toUpperCase()})
                  </div>
                </a>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
