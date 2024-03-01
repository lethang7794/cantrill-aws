import { CertificationBadge } from "@/components/CertificationBadge";
import { getCourses } from "@/lib/getCourses";
import { titleCase } from "@/lib/string";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div id="course-page">
      <ul className="mb-2">
        <li>
          <ul className="flex flex-col gap-2">
            <li>
              <div>
                <div className="flex items-center gap-2">
                  <CertificationBadgeCell />

                  <CertificationCodeCell>
                    <div className="font-mono">Code</div>
                  </CertificationCodeCell>

                  <CertificationNameCell>
                    <div>Name</div>
                  </CertificationNameCell>

                  <div className="flex-grow" />

                  <div className="flex gap-6 font-mono">
                    <LessonCountCell>Theory</LessonCountCell>
                    <LessonCountCell>Demo</LessonCountCell>
                    <LessonCountCell className="font-bold">
                      Total
                    </LessonCountCell>

                    <div></div>

                    <LessonDurationCell header>Theory</LessonDurationCell>
                    <LessonDurationCell header>Demo</LessonDurationCell>
                    <LessonDurationCell header className="font-bold">
                      Total
                    </LessonDurationCell>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      {Object.entries(courses).map(([level, levelCourse]) => {
        return (
          <ul key={level} className="mb-2">
            <li>
              <div className="text-xl">{level.toUpperCase()}</div>
              <ul className="flex flex-col gap-2">
                {(levelCourse as any[]).map((course) => {
                  const code = course.code.toUpperCase();
                  return (
                    <li key={code}>
                      <a href={`/courses/${code}`}>
                        <div className="flex items-center gap-2">
                          <CertificationBadgeCell>
                            <CertificationBadge
                              code={code.toLowerCase()}
                              width={120}
                              height={120}
                            />
                          </CertificationBadgeCell>

                          <CertificationCodeCell>
                            <div className="font-mono">
                              {code.toUpperCase()}
                            </div>
                          </CertificationCodeCell>

                          <CertificationNameCell>
                            <div>{course.title}</div>
                          </CertificationNameCell>

                          <div className="flex-grow" />

                          <div className="flex gap-6 font-mono">
                            <LessonCountCell>
                              {course.count.theory}
                            </LessonCountCell>
                            <LessonCountCell>
                              {course.count.demo}
                            </LessonCountCell>
                            <LessonCountCell className="font-bold">
                              {course.count.total}
                            </LessonCountCell>

                            <div></div>

                            <LessonDurationCell>
                              {course.duration.theory.hhmmss}
                            </LessonDurationCell>
                            <LessonDurationCell>
                              {course.duration.demo.hhmmss}
                            </LessonDurationCell>
                            <LessonDurationCell className="font-bold">
                              {course.duration.total.hhmmss}
                            </LessonDurationCell>
                          </div>
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
    </div>
  );
}

function CertificationBadgeCell({ children }: PropsWithChildren) {
  return <div className="min-w-32">{children}</div>;
}
function CertificationCodeCell({ children }: PropsWithChildren) {
  return <div className="min-w-20">{children}</div>;
}
function CertificationNameCell({ children }: PropsWithChildren) {
  return <div className="min-w-32">{children}</div>;
}
function LessonCountCell({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & PropsWithChildren) {
  return (
    <div {...props} className={cn("min-w-16 text-right", className)}>
      {children}
    </div>
  );
}

const LessonDurationWrapper = ({
  children,
  className,
}: React.ComponentProps<"div"> & PropsWithChildren) => (
  <div className={cn("min-w-16 text-right", className)}>{children}</div>
);
function LessonDurationCell({
  children,
  header,
  ...props
}: React.ComponentProps<"div"> & PropsWithChildren<{ header?: boolean }>) {
  if (header) {
    return <LessonDurationWrapper {...props}>{children}</LessonDurationWrapper>;
  }
  if (typeof children != "string") {
    return null;
  }
  const hh = Number(children.slice(0, 2));
  const mm = Number(children.slice(3, 5));
  console.log({ children, hh, mm });
  const hour = hh + (mm < 20 ? 0 : 1);

  return <LessonDurationWrapper {...props}>{hour}h</LessonDurationWrapper>;
}
