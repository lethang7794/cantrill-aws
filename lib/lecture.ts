import { demoTagMatcher } from "@/constants/tag";

export function isDemoLecture(lecture: any): boolean {
  let match = lecture?.titleWithDuration?.match(demoTagMatcher);
  return Boolean(match);
}

export function convertTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
}
