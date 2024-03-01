import { PropsWithChildren } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function TimeTooltip({
  children,
  tooltip,
  side,
}: PropsWithChildren<{
  tooltip: React.ReactNode;
  side?: "bottom";
}>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
