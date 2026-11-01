import assert from "node:assert/strict";
import { COURSE_CODES } from "../constants/courses";

// Validate the checked-in curriculum before rendering pages from it.
export function validateCourses(data: unknown) {
  assert.ok(
    data && typeof data === "object" && !Array.isArray(data),
    "Curriculum must contain course groups",
  );
  const seen = new Set<string>();
  for (const group of Object.values(data)) {
    assert.ok(Array.isArray(group), "Each course group must be an array");
    for (const course of group) {
      assert.ok(course && typeof course === "object", "Invalid course");
      const code = course.code;
      assert.ok(
        COURSE_CODES.includes(code) && !seen.has(code),
        `Unknown or duplicate course: ${code}`,
      );
      seen.add(code);
      assert.ok(
        typeof course.title === "string" && course.title.trim(),
        `${code}: missing title`,
      );
      const url = new URL(course.url);
      assert.ok(
        url.protocol === "https:" && url.hostname === "learn.cantrill.io",
        `${code}: invalid provider URL`,
      );
      assert.ok(
        Array.isArray(course.sections) && course.sections.length,
        `${code}: missing sections`,
      );
      let courseSeconds = 0;
      let lectureCount = 0;
      for (const section of course.sections) {
        assert.ok(
          typeof section.title === "string" && section.title.trim(),
          `${code}: missing section title`,
        );
        assert.ok(Array.isArray(section.lectures), `${code}: invalid lectures`);
        let sectionSeconds = 0;
        for (const lecture of section.lectures) {
          assert.ok(
            typeof lecture.titleWithDuration === "string" &&
              lecture.titleWithDuration.trim(),
            `${code}: missing lecture title`,
          );
          assert.ok(
            Number.isSafeInteger(lecture.duration) && lecture.duration >= 0,
            `${code}: invalid lecture duration`,
          );
          assert.ok(
            Array.isArray(lecture.tags) &&
              lecture.tags.every((tag: unknown) => typeof tag === "string"),
            `${code}: invalid tags`,
          );
          assert.ok(
            lecture.sharedWith &&
              typeof lecture.sharedWith === "object" &&
              !Array.isArray(lecture.sharedWith),
            `${code}: invalid shared courses`,
          );
          for (const [shared, title] of Object.entries(lecture.sharedWith)) {
            assert.ok(
              COURSE_CODES.some((known) => known === shared) &&
                typeof title === "string",
              `${code}: unknown shared course ${shared}`,
            );
          }
          sectionSeconds += lecture.duration;
          lectureCount++;
        }
        validateDuration(
          section.duration,
          sectionSeconds,
          `${code}: ${section.title}`,
        );
        courseSeconds += sectionSeconds;
      }
      validateDuration(course.duration, courseSeconds, code);
      assert.equal(
        course.count?.total,
        lectureCount,
        `${code}: lecture count does not match sections`,
      );
    }
  }
  assert.ok(seen.size > 0, "Curriculum must contain at least one course");
}

function validateDuration(duration: any, total: number, label: string) {
  for (const kind of ["total", "theory", "demo"]) {
    const value = duration?.[kind];
    assert.ok(
      Number.isSafeInteger(value?.seconds) && value.seconds >= 0,
      `${label}: invalid ${kind} duration`,
    );
    const hours = String(Math.floor(value.seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor(value.seconds / 60) % 60).padStart(
      2,
      "0",
    );
    const seconds = String(value.seconds % 60).padStart(2, "0");
    assert.equal(
      value.hhmmss,
      `${hours}:${minutes}:${seconds}`,
      `${label}: stale ${kind} display duration`,
    );
  }
  assert.equal(
    duration.total.seconds,
    total,
    `${label}: total duration does not match lectures`,
  );
  assert.equal(
    duration.theory.seconds + duration.demo.seconds,
    total,
    `${label}: theory/demo durations do not add up`,
  );
}
