import { cn } from "@/lib/utils";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <h1
      className={cn(
        pressStart2P.className,
        className,
        "bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 flex"
      )}
    >
      <span className="align-middle">Retro Radar</span>
    </h1>
  );
}
