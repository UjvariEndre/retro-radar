import { cn } from "@/lib/utils";
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function Logo({ className, variant = "dark" }: LogoProps) {
  const style =
    variant === "dark"
      ? "align-middle text-glow-left-dark text-3xl text-rr-primary-foreground"
      : "align-middle text-glow-left-light text-3xl text-rr-primary-foreground";

  return (
    <div className={cn(shrikhand.className, className, "select-none")}>
      <span className={style}>Retro Radar</span>
    </div>
  );
}
