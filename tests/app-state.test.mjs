import assert from "node:assert/strict";
import test from "node:test";
import { readAppState, saveAppState, initialState } from "../lib/app-state.ts";

test("server rendering and corrupt stored preferences have safe defaults", (t) => {
  assert.deepEqual(readAppState(new URLSearchParams()), initialState);
  t.after(() => {
    delete globalThis.window;
  });
  for (const value of [
    "{broken",
    "null",
    "17",
    "[]",
    '{"showTag":"false","courses":{}}',
  ]) {
    globalThis.window = { localStorage: { getItem: () => value } };
    assert.deepEqual(readAppState(new URLSearchParams()), initialState);
  }
});

test("URL preferences override storage, including explicitly empty comparisons", (t) => {
  t.after(() => {
    delete globalThis.window;
  });
  globalThis.window = {
    localStorage: {
      getItem: () =>
        JSON.stringify({
          showTag: true,
          courses: ["saa-c03", "saa-c03", "bad"],
        }),
    },
  };
  assert.deepEqual(readAppState(new URLSearchParams()), {
    showTag: true,
    courses: ["saa-c03"],
  });
  assert.deepEqual(
    readAppState(
      new URLSearchParams("sharedWith=DVA-C02,%20sap-c02,bad&hideTag"),
    ),
    { showTag: false, courses: ["dva-c02", "sap-c02"] },
  );
  assert.deepEqual(
    readAppState(new URLSearchParams("sharedWith=")),
    initialState,
  );
});

test("blocked storage and quota exhaustion do not break controls", (t) => {
  t.after(() => {
    delete globalThis.window;
  });
  globalThis.window = {
    get localStorage() {
      throw new Error("SecurityError");
    },
  };
  assert.deepEqual(readAppState(new URLSearchParams()), initialState);
  assert.doesNotThrow(() => saveAppState(initialState));
  globalThis.window = {
    localStorage: {
      setItem() {
        throw new Error("QuotaExceededError");
      },
    },
  };
  assert.doesNotThrow(() => saveAppState(initialState));
});
