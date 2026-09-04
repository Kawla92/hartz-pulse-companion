import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  progress: number;
  measuring: boolean;
  children?: ReactNode;
}

/** Dashed circular indicator matching the reference composition. */
export function MeasurementProgress({ progress, measuring, children }: Props) {
  const radius = 96;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto grid size-56 place-items-center">
      <svg viewBox="0 0 220 220" className={cn("absolute inset-0", measuring && "dash-spin")}>
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="9 11"
          strokeLinecap="round"
          className="text-foreground/85"
        />
      </svg>
      <svg viewBox="0 0 220 220" className="absolute inset-0 -rotate-90">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>
      <div className="relative z-10 px-6 text-center">
        {children ?? (
          <span className="text-lg font-semibold" aria-live="polite">
            {Math.round(progress)}% loading
          </span>
        )}
      </div>
    </div>
  );
}
