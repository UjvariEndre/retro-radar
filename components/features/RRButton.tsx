import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface RRButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const RRButton = (props: RRButtonProps) => {
  const style = "h-11 px-4 py-2 rounded-lg select-none";
  let variant;
  switch (props.variant) {
    case "secondary":
      variant =
        "bg-slate-100 text-slate-800 hover:bg-slate-100 hover:text-amber-400";
      break;
    case "destructive":
      variant =
        "bg-slate-100 text-destructive hover:bg-slate-100 hover:text-amber-400 p-3";
      break;
    default:
      variant = "bg-slate-700 text-amber-400 hover:bg-slate-600";
  }

  return (
    <Button {...props} className={cn(style, variant, props.className)}>
      {props.children}
    </Button>
  );
};
export default RRButton;
