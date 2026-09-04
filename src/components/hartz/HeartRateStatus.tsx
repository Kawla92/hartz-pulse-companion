import { cn } from "@/lib/utils";
import { STATUS_LABELS, type HeartRateStatus as Status } from "@/lib/harz";

const SWATCH: Record<Status, string> = {
  normal: "bg-status-normal",
  risky: "bg-status-risky",
  attention: "bg-status-attention",
};

export function StatusSwatch({ status, className }: { status: Status; className?: string }) {
  return <span aria-hidden className={cn("size-6 rounded-md", SWATCH[status], className)} />;
}

/** Status legend from the reference design; the active row is highlighted. */
export function HeartRateStatusLegend({ active }: { active?: Status | undefined }) {
  const statuses: Status[] = ["normal", "risky", "attention"];
  return (
    <ul className="space-y-3">
      {statuses.map((s) => (
        <li
          key={s}
          className={cn(
            "flex items-center gap-4 rounded-2xl bg-background/60 px-4 py-3 transition-colors",
            active === s && "bg-background ring-1 ring-accent",
          )}
        >
          <StatusSwatch status={s} />
          <span className="text-base font-medium">{STATUS_LABELS[s]}</span>
          {active === s && (
            <span className="ml-auto text-xs text-muted-foreground">your result</span>
          )}
        </li>
      ))}
    </ul>
  );
}
