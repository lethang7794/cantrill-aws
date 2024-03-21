"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  allTagMatcher,
  associateLevelTagMatcher,
  demoTagMatcher,
  newOrUpdateTagMatcher,
  proLevelTagMatcher,
  refresherTagMatcher,
  specialtyLevelTagMatcher,
  tagBracesMatcher,
  warningTagMatcher,
} from "@/constants/tag";
import { useApp } from "@/context/app.context";
import { Separator } from "./ui/separator";

export function LectureTags({ tags }: { tags: string[] }) {
  const { state } = useApp();

  if (!state?.showTag) {
    return null;
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap justify-end">
        {tags.map((t: string) => (
          <LectureTag key={t} tag={t} />
        ))}
      </div>
      <Separator orientation="vertical" className="min-h-8 -mr-3 ml-1 -my-2" />
    </>
  );
}

export const LectureTag = React.memo<{ tag: string }>(({ tag }) => {
  const t = sanitizeTag(tag);
  if (!t) {
    return null;
  }

  return (
    <Badge
      variant={isDemoTag(t) ? "default" : "outline"}
      className={cn("h-min capitalize w-fit break-keep", {
        "text-white":
          isWarningTag(t) ||
          isAllTag(t) ||
          isAssociateTag(t) ||
          isProTag(t) ||
          isSpecialtyTag(t) ||
          isRefresherTag(t) ||
          isNewTag(t),
        "bg-[#46505D]": isAllTag(t),
        "bg-[#058296]": isProTag(t),
        "bg-[#3638EE]": isAssociateTag(t),
        "bg-[#5131B1]": isSpecialtyTag(t),
        "bg-[#FF9900]": isDemoTag(t),
        "bg-red-700": isWarningTag(t),
        "bg-blue-400": isRefresherTag(t),
        "bg-green-500": isNewTag(t),
      })}
      rounded={isDemoTag(t) ? "full" : "sm"}
    >
      {t}
    </Badge>
  );
});
LectureTag.displayName = "LectureTag";

function isWarningTag(tag: string): boolean {
  let match = tag.match(warningTagMatcher);
  return Boolean(match);
}

function isAllTag(tag: string): boolean {
  let match = tag.match(allTagMatcher);
  return Boolean(match);
}

function isAssociateTag(tag: string): boolean {
  let match = tag.match(associateLevelTagMatcher);
  return Boolean(match);
}

function isProTag(tag: string): boolean {
  let match = tag.match(proLevelTagMatcher);
  return Boolean(match);
}

function isSpecialtyTag(tag: string): boolean {
  let match = tag.match(specialtyLevelTagMatcher);
  return Boolean(match);
}

function isDemoTag(tag: string) {
  let match = tag.match(demoTagMatcher);
  return Boolean(match);
}

function isRefresherTag(tag: string) {
  let match = tag.match(refresherTagMatcher);
  return Boolean(match);
}

function isNewTag(tag: string): any {
  let match = tag.match(newOrUpdateTagMatcher);
  return Boolean(match);
}

function sanitizeTag(tag: string): string {
  return (
    tag
      // remove braces
      .replaceAll(tagBracesMatcher, "")
      .toUpperCase()
      // remove update
      .replaceAll(/UPDATED*/gi, "")
      .replaceAll("NEEDS", "NEEDS UPDATE")
      .replaceAll("UI S", "UI UPDATES")
      // &
      .replaceAll("/", " & ")
      .replaceAll(/(?!\w)&(?=\w)/gi, " & ")
      .replaceAll("AND", "&")
      // make the semantic clear
      .replaceAll("ADVANCEDDEMO", "ADVANCED DEMO")
      .replaceAll("ADVDEMO", "ADVANCED DEMO")
      .replaceAll("MINIPROJECT", "MINI PROJECT")
      .replaceAll("SAPRO", "SAP")
      // remove redundancy shared
      .replaceAll("SHARED", "")
      .trim()
  );
}
