export function SectionTime({ section }: { section: any }) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {section.duration.theory.hhmmss}
      </div>
      <div className="font-mono min-w-20 text-right">{section.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {section.duration.total.hhmmss}
      </div>
    </>
  );
}
