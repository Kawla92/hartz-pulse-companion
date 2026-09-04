import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

const ROWS = [
  {
    icon: ArrowRight,
    color: "text-status-normal",
    label: "Normal :",
    value: "70 - 100 bpm",
    note: "",
  },
  {
    icon: ArrowUp,
    color: "text-status-risky",
    label: "Tachycardia :",
    value: "> 100 bpm",
    note: "(At rest)",
  },
  {
    icon: ArrowDown,
    color: "text-status-risky",
    label: "Bradycardia :",
    value: "< 65 bpm",
    note: "(non-athletes)",
  },
];

export function UsefulValues() {
  return (
    <section className="rounded-3xl bg-panel-deep px-5 py-5">
      <h2 className="text-base font-semibold text-card-foreground">Useful values :</h2>
      <ul className="mt-3 space-y-2">
        {ROWS.map(({ icon: Icon, color, label, value, note }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <Icon aria-hidden className={`size-4 shrink-0 ${color}`} />
            <span className="text-card-foreground">
              {label} {value} {note && <span className="text-muted-foreground">{note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
