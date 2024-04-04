export const COURSES = {
  "saa-c03": {
    name: "SAA",
    color: "#3638EE",
    certificateURL:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate",
  },
  "dva-c02": {
    name: "DVA",
    color: "#3638EE",
    certificateURL:
      "https://aws.amazon.com/certification/certified-developer-associate",
  },
  "soa-c02": {
    name: "SOA",
    color: "#3638EE",
    certificateURL:
      "https://aws.amazon.com/certification/certified-sysops-admin-associate",
  },
  "sap-c02": {
    name: "SAP",
    color: "#058296",
    certificateURL:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional",
  },
  "dop-c02": {
    name: "DOP",
    color: "#058296",
    certificateURL:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional",
  },
  "ans-c01": {
    name: "ANS",
    color: "#5131B1",
    certificateURL:
      "https://aws.amazon.com/certification/certified-advanced-networking-specialty",
  },
  "scs-c01": {
    name: "SCS",
    color: "#5131B1",
    certificateURL:
      "https://aws.amazon.com/certification/certified-security-specialty",
  },
} as const;

export type CourseCode = keyof typeof COURSES;

export const COURSE_CODES = Object.entries(COURSES).map(
  ([key]) => key as CourseCode
);

export const COURSE_CHECKBOXES = Object.entries(COURSES).map(([key, val]) => ({
  id: key as CourseCode,
  label: val.name,
}));
