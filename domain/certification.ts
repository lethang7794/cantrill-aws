export const SHARED_WITH = {
  "saa-c03": { name: "SAA", color: "#3638EE" },
  "dva-c02": { name: "DVA", color: "#3638EE" },
  "soa-c02": { name: "SOA", color: "#3638EE" },
  "sap-c02": { name: "SAP", color: "#058296" },
  "dop-c02": { name: "DOP", color: "#058296" },
  "ans-c01": { name: "ANS", color: "#5131B1" },
  "scs-c01": { name: "SCS", color: "#5131B1" },
} as const;

type SharedWith = typeof SHARED_WITH;

export type CertificationCode = keyof SharedWith;
