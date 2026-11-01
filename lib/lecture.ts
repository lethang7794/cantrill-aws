import { demoTagMatcher } from "../constants/tag";

export function isDemoLecture(lecture: any): boolean {
  let match = lecture?.titleWithDuration?.match(demoTagMatcher);
  return Boolean(match);
}

export function convertTime(seconds: number) {
  if (!Number.isSafeInteger(seconds) || seconds < 0) {
    throw new RangeError(
      "Duration must be a non-negative integer number of seconds",
    );
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${minutes}:${remainder}`
    : `${minutes}:${remainder}`;
}
