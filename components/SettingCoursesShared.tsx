"use client";

import { useApp } from "@/context/app.context";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { COURSES, COURSE_CHECKBOXES, CourseCode } from "@/constants/courses";
import { cn } from "@/lib/utils";

export function SettingCoursesShared({
  currentCourse,
}: {
  currentCourse: CourseCode;
}) {
  const { state, dispatch } = useApp();

  const courses = state?.courses || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared with</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap items-center gap-4">
          {COURSE_CHECKBOXES.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={courses.includes(item.id) || currentCourse == item.id}
                disabled={currentCourse == item.id}
                onCheckedChange={(checked) => {
                  return checked
                    ? dispatch({
                        type: "set-courses",
                        payload: [...courses, item.id],
                      })
                    : dispatch({
                        type: "set-courses",
                        payload: courses.filter((value) => value !== item.id),
                      });
                }}
              />
              <Label
                htmlFor={item.id}
                className={cn(
                  "font-semibold",
                  currentCourse == item.id && "font-bold underline"
                )}
                style={{ color: COURSES[item.id].color }}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
