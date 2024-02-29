import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { squareBracesRegex } from "../app/courses/[slug]/page";

export function CourseTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap justify-end">
      {tags.map((t: string) => (
        <CourseTag key={t} tag={t} />
      ))}
    </div>
  );
}

export function CourseTag({ tag }: { tag: string }) {
  const sanitizedTag = sanitizeTag(tag);
  return (
    <Badge
      variant={isDemoTag(sanitizedTag) ? "default" : "outline"}
      className={cn("h-min capitalize w-fit break-keep", {
        "text-white":
          isWarningTag(sanitizedTag) ||
          isAllTag(sanitizedTag) ||
          isAssociateTag(sanitizedTag) ||
          isProTag(sanitizedTag) ||
          isSpecialtyTag(sanitizedTag),
        "bg-[#46505D]": isAllTag(sanitizedTag),
        "bg-[#058296]": isProTag(sanitizedTag),
        "bg-[#3638EE]": isAssociateTag(sanitizedTag),
        "bg-[#5131B1]": isSpecialtyTag(sanitizedTag),
        "bg-[#FF9900]": isDemoTag(sanitizedTag),
        "bg-red-700": isWarningTag(sanitizedTag),
      })}
      rounded={isDemoTag(sanitizedTag) ? "full" : "sm"}
    >
      {sanitizedTag}
    </Badge>
  );
}
function isWarningTag(sanitizedTag: string): any {
  return sanitizedTag.match(/NEEDS|DON'T|DONT/gi);
}
function isAllTag(sanitizedTag: string): any {
  return sanitizedTag.match(/ALL/gi);
}
function isAssociateTag(sanitizedTag: string): any {
  return sanitizedTag.match(/ASSOCIATE/gi);
}
function isProTag(sanitizedTag: string): any {
  return sanitizedTag.match(/PRO(?!D)/gi);
}
function isSpecialtyTag(sanitizedTag: string): any {
  return sanitizedTag.match(/ANS|SCS/gi);
}
function isDemoTag(tag: string) {
  return tag.includes("DEMO");
}
function sanitizeTag(t: string): string {
  return t
    .replaceAll(squareBracesRegex, "")
    .toUpperCase()
    .replaceAll(/UPDATED*/gi, "")
    .replaceAll("NEEDS", "NEEDS UPDATE")
    .replaceAll("/", " & ")
    .replaceAll("AND", "&")
    .replaceAll("ADVANCEDDEMO", "ADVANCED DEMO")
    .replaceAll("SHARED", "");
}
