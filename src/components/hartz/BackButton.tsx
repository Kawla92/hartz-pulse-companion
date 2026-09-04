import { useRouter } from "@tanstack/react-router";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.history.back()}
      className="rounded-2xl bg-card px-6 py-3 text-base font-medium text-card-foreground transition-colors hover:bg-panel-deep focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {label}
    </button>
  );
}
