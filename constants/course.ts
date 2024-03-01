import { CertificationCode } from "@/domain/certification";

export const COURSES_CHECKBOX_ITEMS: {
  id: CertificationCode;
  label: string;
}[] = [
  {
    id: "saa-c03",
    label: "SAA",
  },
  {
    id: "dva-c02",
    label: "DVA",
  },
  {
    id: "soa-c02",
    label: "SOA",
  },
  {
    id: "sap-c02",
    label: "SAP",
  },
  {
    id: "dop-c02",
    label: "DOP",
  },
  {
    id: "ans-c01",
    label: "ANS",
  },
  {
    id: "scs-c01",
    label: "SCS",
  },
] as const;

export const COURSES = COURSES_CHECKBOX_ITEMS.map((c) => c.id);
