import { COURSE_CODES } from "../constants/courses";
import { LOCAL_STORAGE_APP_STATE_KEY } from "../constants/localStorage";
import { PARAM_KEYS } from "../constants/paramKeys";

export type AppState = { showTag: boolean; courses: string[] };
export const initialState: AppState = { showTag: true, courses: [] };

export function normalizeCourses(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value.filter(
        (code): code is string =>
          typeof code === "string" &&
          COURSE_CODES.some((known) => known === code),
      ),
    ),
  );
}

export function readAppState(params: URLSearchParams): AppState {
  let state = { ...initialState };
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY) || "null",
    );
    if (saved && typeof saved === "object") {
      state = {
        showTag: typeof saved.showTag === "boolean" ? saved.showTag : true,
        courses: normalizeCourses(saved.courses),
      };
    }
  } catch {
    // Saved preferences are optional when storage is unavailable or corrupt.
  }
  if (params.has(PARAM_KEYS.sharedWith)) {
    state.courses = normalizeCourses(
      params
        .get(PARAM_KEYS.sharedWith)!
        .toLowerCase()
        .split(",")
        .map((code) => code.trim()),
    );
  }
  if (params.has(PARAM_KEYS.hideTag)) state.showTag = false;
  return state;
}

export function saveAppState(state: AppState) {
  try {
    window.localStorage.setItem(
      LOCAL_STORAGE_APP_STATE_KEY,
      JSON.stringify(state),
    );
  } catch {
    // Keep controls usable when the browser denies storage or its quota is full.
  }
}
