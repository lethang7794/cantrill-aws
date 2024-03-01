import { CertificationBadge } from "@/components/CertificationBadge";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/getCourses";
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
                    <div>Code</div>
                  </CertificationCodeCell>

                  <CertificationNameCell>
                    <div>Name</div>
                  </CertificationNameCell>

                  <div className="flex-grow" />

                  <div className="flex gap-6 items-center">
                    <LessonCountCell>
                      Theory
                      <br />
                      <Unit>(lectures)</Unit>
                    </LessonCountCell>
                    <LessonCountCell>
                      Demo
                      <br />
                      <Unit>(lectures)</Unit>
                    </LessonCountCell>
                    <LessonCountCell className="font-bold">
                      Total
                      <br />
                      <Unit>(lectures)</Unit>
                    </LessonCountCell>

                    <LessonDurationCell header>
                      Theory
                      <br />
                      <Unit>(hours)</Unit>
                    </LessonDurationCell>
                    <LessonDurationCell header>
                      Demo
                      <br />
                      <Unit>(hours)</Unit>
                    </LessonDurationCell>
                    <LessonDurationCell header className="font-bold">
                      Total
                      <br />
                      <Unit>(hours)</Unit>
                    </LessonDurationCell>

                    <CurriculumCell>
                      Course
                      <br />
                      Curriculum
                    </CurriculumCell>

                    <CourseUrlCell>
                      Course
                      <br />
                      URL
                    </CourseUrlCell>
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
              {/* <div className="text-xl">{level.toUpperCase()}</div> */}
              <ul className="flex flex-col gap-2">
                {(levelCourse as any[]).map((course) => {
                  const code = course.code.toUpperCase();
                  return (
                    <li key={code}>
                      <div>
                        <div className="flex items-center gap-2">
                          <CertificationBadgeCell>
                            <CertificationBadge
                              code={code.toLowerCase()}
                              width={120}
                              height={120}
                            />
                          </CertificationBadgeCell>

                          <CertificationCodeCell>
                            <div>{code.toUpperCase()}</div>
                          </CertificationCodeCell>

                          <CertificationNameCell>
                            <div className="italic">{course.title}</div>
                          </CertificationNameCell>

                          <div className="flex-grow" />

                          <div className="flex gap-6 items-center">
                            <LessonCountCell>
                              {course.count.theory}
                            </LessonCountCell>
                            <LessonCountCell>
                              {course.count.demo}
                            </LessonCountCell>
                            <LessonCountCell className="font-bold">
                              {course.count.total}
                            </LessonCountCell>

                            <LessonDurationCell>
                              {course.duration.theory.hhmmss}
                            </LessonDurationCell>
                            <LessonDurationCell>
                              {course.duration.demo.hhmmss}
                            </LessonDurationCell>
                            <LessonDurationCell className="font-bold">
                              {course.duration.total.hhmmss}
                            </LessonDurationCell>

                            <CurriculumCell>
                              <Button
                                asChild
                                // variant="link"
                                // className="whitespace-break-spaces"
                              >
                                <a href={`/courses/${code}`}>
                                  {/* {code} */}
                                  Curriculum
                                </a>
                              </Button>
                            </CurriculumCell>

                            <CourseUrlCell>
                              <Button asChild variant="outline">
                                <a href={course.url}>
                                  {/* <span className="text-nowrap">{code}</span>
                                  <br /> */}
                                  Course
                                </a>
                              </Button>
                            </CourseUrlCell>
                          </div>
                        </div>
                      </div>
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
  return <div className="min-w-20 font-bold">{children}</div>;
}

function CertificationNameCell({ children }: PropsWithChildren) {
  return <div className="min-w-32 font-bold">{children}</div>;
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
  const hour = hh + (mm < 20 ? 0 : 1);

  return <LessonDurationWrapper {...props}>{hour}h</LessonDurationWrapper>;
}

function Unit({ children }: PropsWithChildren) {
  return <div className="text-xs">{children}</div>;
}

function CurriculumCell(props: PropsWithChildren) {
  return <div className="min-w-28 text-center font-bold">{props.children}</div>;
}

function CourseUrlCell(props: PropsWithChildren) {
  return <div className="min-w-24 text-center">{props.children}</div>;
}
