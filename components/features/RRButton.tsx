import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface RRButtonProps extends ButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const RRButton = (props: RRButtonProps) => {
  const { isActive, ...genericProps } = props;
  const style = "h-11 px-4 py-2 rounded-lg select-none";
  let variant;
  switch (props.variant) {
    case "secondary":
      variant =
        "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-active";
      break;
    case "outline":
      variant =
        "bg-white text-secondary-foreground hover:text-secondary-active hover:bg-white";
      break;
    case "destructive":
      variant =
        "bg-secondary text-destructive hover:bg-secondary hover:text-secondary-active p-3";
      break;
    default:
      variant = "bg-primary text-primary-foreground hover:bg-primary-light";
  }

  return (
    <Button
      {...genericProps}
      className={cn(
        style,
        variant,
        props.className,
        isActive && "text-secondary-active font-bold disabled:opacity-100",
      )}
      disabled={props.disabled || isActive}
    >
      {props.children}
    </Button>
  );
};
export default RRButton;
