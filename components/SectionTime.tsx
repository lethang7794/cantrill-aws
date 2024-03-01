import { TimeTooltip } from "./TimeTooltip";

export function SectionTime({
  section,
  side,
}: {
  section: any;
  side?: "bottom";
}) {
  return (
    <>
      <TimeTooltip
        tooltip={
          <div>
            <div>Section duration (hh:mm:ss)</div>
            <div>- Theory: {section.duration.theory.hhmmss}</div>
            <div>- Demo: {section.duration.demo.hhmmss}</div>
          </div>
        }
        side={side}
      >
        <div className="font-mono min-w-20 text-right">
          {section.duration.total.hhmmss}
        </div>
      </TimeTooltip>
    </>
  );
}
