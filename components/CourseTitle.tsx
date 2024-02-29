export function CourseTitle(props: { course: any }) {
  return (
    <h1 className="py-2 text-4xl font-semibold max-h-14 truncate">
      {`${props.course.code.toUpperCase()}: ${props.course.title}`}
    </h1>
  );
}
