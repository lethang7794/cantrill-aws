"use client";

import { useApp } from "@/context/app.context";
import { Checkbox } from "@/components/ui/checkbox";
import { CertificationCode } from "@/domain/certification";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";

const items: { id: CertificationCode; label: string }[] = [
  {
    id: "saa-c03",
    label: "SAA",
  },
  {
    id: "dva-c02",
    label: "DVA",
  },
  {
    id: "soa-c02",
    label: "SOA",
  },
  {
    id: "sap-c02",
    label: "SAP",
  },
  {
    id: "dop-c02",
    label: "DOP",
  },
  {
    id: "ans-c01",
    label: "ANS",
  },
  {
    id: "scs-c01",
    label: "SCS",
  },
] as const;

export function CoursesCompareSetting() {
  const { state, dispatch } = useApp();

  const courses = state.courses || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shared with</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          {items.map((item) => (
            <div className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={courses.includes(item.id)}
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
