import { ComponentProps } from "react";
import { CertificationCode } from "@/domain/certification";

export function CertificationBadge(
  props: ComponentProps<"img"> & {
    code: CertificationCode;
  },
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

export function getBadgeSrc(code: CertificationCode) {
  return `/aws/${code.slice(0, 3).toUpperCase()}.png`;
}
