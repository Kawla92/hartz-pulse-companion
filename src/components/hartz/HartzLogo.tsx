import { cn } from "@/lib/utils";

/** Härtz wordmark: the initial H is drawn as an ECG/heartbeat line in cyan. */
export function HartzLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end justify-center", className)}>
      <svg
        viewBox="0 0 54 44"
        role="img"
        aria-label="Härtz"
        className="h-11 w-[3.4rem] shrink-0"
      >
        <path
          d="M1 32 H8 l4 -6 4 20 5 -38 5 38 4 -20 4 6 h7"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="-ml-4 text-[2.6rem] leading-none font-light tracking-tight text-panel-deep"
        aria-hidden
      >
        ärtz
      </span>
    </div>
  );
}
