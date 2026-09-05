import { cn } from "@/lib/utils";

interface RadioOptionProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
}

export function RadioOption({ name, label, value, checked, onSelect }: RadioOptionProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3.5 py-1.5">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "flex size-6 items-center justify-center rounded-full border border-border/60 bg-foreground/90 transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card",
        )}
      >
        <span
          className={cn(
            "size-3.5 rounded-full transition-colors",
            checked ? "bg-accent" : "bg-transparent",
          )}
        />
      </span>
      <span className="text-[15px] leading-5 text-card-foreground">{label}</span>
    </label>
  );
}
