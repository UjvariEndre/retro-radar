import { cn } from "@/lib/utils"; // Optional class merging
import { forwardRef } from "react";
import { Input } from "../ui/input";

const RRInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <Input
      ref={ref}
      type={type}
      className={cn("h-11 rounded-lg border bg-white p-2", className)}
      {...props}
    />
  );
});

RRInput.displayName = "RRInput";

export default RRInput;
