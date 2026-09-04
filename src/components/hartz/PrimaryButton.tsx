import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "mx-auto min-h-[3.4rem] rounded-full bg-primary px-14 text-lg font-medium text-primary-foreground",
        "transition-colors duration-200 hover:bg-panel-deep active:scale-[0.985]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
    />
  );
}
