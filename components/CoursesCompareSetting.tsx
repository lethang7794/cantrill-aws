"use client";

import { useApp } from "@/context/app.context";
import { Checkbox } from "@/components/ui/checkbox";
import { CertificationCode } from "@/domain/certification";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { COURSES_CHECKBOX_ITEMS } from "@/constants/course";

export function CoursesCompareSetting({
  currentCourse,
}: {
  currentCourse: CertificationCode;
}) {
  const { state, dispatch } = useApp();

  const courses = state.courses || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared with</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          {COURSES_CHECKBOX_ITEMS.map((item) => (
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
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
