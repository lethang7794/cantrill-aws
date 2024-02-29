import { demoTagMatcher } from "@/constants/tag";

export function isDemoLecture(lecture: any): boolean {
  let match = lecture?.titleWithDuration?.match(demoTagMatcher);
  return Boolean(match);
}
