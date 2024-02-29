import { cn } from "@/lib/utils";

const SHARED_WITH = {
  "saa-c03": { name: "SAA", color: "#3638EE" },
  "dva-c02": { name: "DVA", color: "#3638EE" },
  "soa-c02": { name: "SOA", color: "#3638EE" },
  "sap-c02": { name: "SAP", color: "#058296" },
  "dop-c02": { name: "DOP", color: "#058296" },
  "ans-c01": { name: "ANS", color: "#5131B1" },
  "scs-c01": { name: "SCS", color: "#5131B1" },
} as const;
type SharedWith = typeof SHARED_WITH;
type CourseCode = keyof SharedWith;
function SharedWith({
  sharedWith,
  target,
  cur,
}: {
  sharedWith: Record<CourseCode, string>;
  target: CourseCode;
  cur: CourseCode;
}) {
  return (
    <div
      className={cn(
        "font-semibold text-xs min-w-8 text-[#3638EE]",
        cur == target && "font-bold"
      )}
      style={{ color: SHARED_WITH[target].color }}
    >
      {sharedWith[target] || cur == target ? SHARED_WITH[target].name : null}
    </div>
  );
}
export function SharedWithOthers({
  sharedWith,
  cur,
}: {
  sharedWith: Record<CourseCode, string>;
  cur: CourseCode;
}) {
  return (
    <>
      <SharedWith sharedWith={sharedWith} cur={cur} target="saa-c03" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="dva-c02" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="soa-c02" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="sap-c02" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="dop-c02" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="ans-c01" />
      <SharedWith sharedWith={sharedWith} cur={cur} target="scs-c01" />
    </>
  );
}
