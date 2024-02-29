import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  warningTagMatcher,
  allTagMatcher,
  associateLevelTagMatcher,
  proLevelTagMatcher,
  specialtyLevelTagMatcher,
  demoTagMatcher,
  tagBracesMatcher,
} from "@/constants/tag";

export function LectureTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap justify-end">
      {tags.map((t: string) => (
        <LectureTag key={t} tag={t} />
      ))}
    </div>
  );
}

export function LectureTag({ tag }: { tag: string }) {
  const t = sanitizeTag(tag);
  return (
    <Badge
      variant={isDemoTag(t) ? "default" : "outline"}
      className={cn("h-min capitalize w-fit break-keep", {
        "text-white":
          isWarningTag(t) ||
          isAllTag(t) ||
          isAssociateTag(t) ||
          isProTag(t) ||
          isSpecialtyTag(t),
        "bg-[#46505D]": isAllTag(t),
        "bg-[#058296]": isProTag(t),
        "bg-[#3638EE]": isAssociateTag(t),
        "bg-[#5131B1]": isSpecialtyTag(t),
        "bg-[#FF9900]": isDemoTag(t),
        "bg-red-700": isWarningTag(t),
      })}
      rounded={isDemoTag(t) ? "full" : "sm"}
    >
      {t}
    </Badge>
  );
}

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

function sanitizeTag(tag: string): string {
  return (
    tag
      // remove braces
      .replaceAll(tagBracesMatcher, "")
      .toUpperCase()
      // remove update
      .replaceAll(/UPDATED*/gi, "")
      .replaceAll("NEEDS", "NEEDS UPDATE")
      // &
      .replaceAll("/", " & ")
      .replaceAll("AND", "&")
      // add space
      .replaceAll("ADVANCEDDEMO", "ADVANCED DEMO")
      // remove redundancy shared
      .replaceAll("SHARED", "")
  );
}
