import { ComponentProps } from "react";
import { CourseCode } from "@/constants/courses";

export function CertificationBadge(
  props: ComponentProps<"img"> & {
    code: CourseCode;
  }
) {
  return (
    <img
      src={getBadgeSrc(props.code)}
      alt=""
      width={props.width || 56}
      height={props.height || 56}
    />
  );
}

export function getBadgeSrc(code: CourseCode) {
  return `/aws/${code.slice(0, 3).toUpperCase()}.png`;
}
