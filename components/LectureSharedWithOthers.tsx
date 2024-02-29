import { cn } from "@/lib/utils";
import { CertificationCode, SHARED_WITH } from "@/domain/certification";

function SharedWith({
  sharedWith,
  target,
  cur,
}: {
  sharedWith: Record<CertificationCode, string>;
  target: CertificationCode;
  cur: CertificationCode;
}) {
  return (
    <div
      className={cn(
        "font-semibold text-xs min-w-8 text-[#3638EE]",
        cur == target && "font-bold",
      )}
      style={{ color: SHARED_WITH[target].color }}
    >
      {sharedWith[target] || cur == target ? SHARED_WITH[target].name : null}
    </div>
  );
}

export function LectureSharedWithOthers({
  sharedWith,
  cur,
}: {
  sharedWith: Record<CertificationCode, string>;
  cur: CertificationCode;
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
