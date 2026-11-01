import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateCourses } from "../lib/validate-courses.ts";
import { convertTime } from "../lib/lecture.ts";

const curriculum = JSON.parse(
  readFileSync(new URL("../app/courses.json", import.meta.url), "utf8"),
);

test("the complete checked-in curriculum has valid references, counts and durations", () => {
  validateCourses(curriculum);
});

test("corrupt curriculum fails validation before pages are rendered", () => {
  const mutations = [
    (c) => {
      c.associate[0].code = "unknown";
    },
    (c) => {
      c.associate.push(c.associate[0]);
    },
    (c) => {
      c.associate[0].url = "javascript:alert(1)";
    },
    (c) => {
      c.associate[0].sections[0].lectures[0].duration = -1;
    },
    (c) => {
      c.associate[0].sections[0].lectures[0].sharedWith.invalid =
        "bad reference";
    },
    (c) => {
      c.associate[0].duration.total.hhmmss = "00:00:00";
    },
    (c) => {
      c.associate[0].count.total++;
    },
    (c) => {
      c.associate[0].sections[0].lectures[0].tags = null;
    },
  ];
  for (const mutate of mutations) {
    const data = structuredClone(curriculum);
    mutate(data);
    assert.throws(() => validateCourses(data));
  }
  for (const invalid of [null, [], {}, { associate: {} }])
    assert.throws(() => validateCourses(invalid));
});

test("lecture duration never wraps at an hour or a day", () => {
  for (const [seconds, expected] of [
    [0, "00:00"],
    [59, "00:59"],
    [60, "01:00"],
    [3599, "59:59"],
    [3600, "1:00:00"],
    [90061, "25:01:01"],
  ]) {
    assert.equal(convertTime(seconds), expected);
  }
  for (const invalid of [-1, NaN, Infinity, 1.5])
    assert.throws(() => convertTime(invalid), RangeError);
});
