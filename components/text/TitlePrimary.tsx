import { cn } from "@/lib/utils";
import { Shrikhand } from "next/font/google";
import React from "react";
import HrPrimary from "../design/HrPrimary";

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface TitlePrimaryProps {
  children: React.ReactNode;
  className?: string;
}

const TitlePrimary = ({ children, className }: TitlePrimaryProps) => {
  return (
    <>
      <h1
        className={cn(
          "text-3xl text-slate-100 mb-4",
          shrikhand.className,
          className
        )}
      >
        {children}
      </h1>
      <HrPrimary />
    </>
  );
};
export default TitlePrimary;
