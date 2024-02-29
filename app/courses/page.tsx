import { getCourses } from "@/lib/getCourses";
import { titleCase } from "@/lib/string";
import React from "react";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      {Object.entries(courses).map(([level, levelCourse]) => {
        return (
          <ul key={level}>
            <li>
              <div className="text-xl">Level: {titleCase(level)}</div>
              <ul className="ml-4">
                {(levelCourse as any[]).map((course) => {
                  const code = course.code.toUpperCase();
                  return (
                    <li key={code}>
                      <a href={`/courses/${code}`}>
                        <div>
                          {course.title} ({code.toUpperCase()})
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        );
      })}
    </>
  );
}
