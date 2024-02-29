import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

function isWarningTag(tag: string): boolean {
  let match = tag.match(/NEEDS|DON'T|DONT/gi);
  return Boolean(match);
}

function isAllTag(tag: string): boolean {
  let match = tag.match(/ALL/gi);
  return Boolean(match);
}

function isAssociateTag(tag: string): boolean {
  let match = tag.match(/ASSOCIATE|DVA|SAA|SOA/gi);
  return Boolean(match);
}

function isProTag(tag: string): boolean {
  let match = tag.match(/PRO(?!D)|SAP|DOP/gi);
  return Boolean(match);
}

function isSpecialtyTag(tag: string): boolean {
  let match = tag.match(/ANS|SCS/gi);
  return Boolean(match);
}

function isDemoTag(tag: string) {
  let match = tag.match(/DEMO/gi);
  return Boolean(match);
}

function sanitizeTag(tag: string): string {
  return tag
    .replaceAll(/[\[\]]/gi, "")
    .toUpperCase()
    .replaceAll(/UPDATED*/gi, "")
    .replaceAll("NEEDS", "NEEDS UPDATE")
    .replaceAll("/", " & ")
    .replaceAll("AND", "&")
    .replaceAll("ADVANCEDDEMO", "ADVANCED DEMO")
    .replaceAll("SHARED", "");
}
