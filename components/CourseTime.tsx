export function CourseTime({ course }: { course: any }) {
  return (
    <>
      {/* <div className="font-mono min-w-20 text-right">
        {course.duration.theory.hhmmss}
      </div>
      <div className="font-mono min-w-20 text-right">{course.duration.demo.hhmmss}</div> */}
      <div className="font-mono min-w-20 text-right">
        {course.duration.total.hhmmss}
      </div>
    </>
  );
}
