import { cn } from "@/lib/utils";
import React from "react";

interface RRScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const RRScrollArea = ({ children, className }: RRScrollAreaProps) => {
  return <div className={cn("scroll-area", className)}>{children}</div>;
};
export default RRScrollArea;
