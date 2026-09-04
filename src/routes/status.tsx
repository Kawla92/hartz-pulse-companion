import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/hartz/AppShell";
import { BackButton } from "@/components/hartz/BackButton";
import { PrimaryButton } from "@/components/hartz/PrimaryButton";
import { RadioOption } from "@/components/hartz/RadioOption";
import { UsefulValues } from "@/components/hartz/UsefulValues";
import {
  ACTIVITY_LABELS,
  PHYSICAL_LABELS,
  saveContext,
  type ActivityStatus,
  type PhysicalStatus,
} from "@/lib/harz";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Your context – Härtz" },
      {
        name: "description",
        content:
          "Tell Härtz whether you are at rest or in activity and how you feel, then start a simulated heart-rate measurement.",
      },
      { property: "og:title", content: "Your context – Härtz" },
      {
        property: "og:description",
        content:
          "Select your activity and physical/emotional status before a simulated Härtz measurement.",
      },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const navigate = useNavigate();
  const [activityStatus, setActivityStatus] = useState<ActivityStatus | null>(null);
  const [physicalStatus, setPhysicalStatus] = useState<PhysicalStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  function start() {
    if (!activityStatus || !physicalStatus) {
      setError(
        !activityStatus && !physicalStatus
          ? "Please select your activity status and your physical / emotional status."
          : !activityStatus
            ? "Please select your activity status."
            : "Please select your physical / emotional status.",
      );
      return;
    }
    setError(null);
    saveContext({ activityStatus, physicalStatus });
    navigate({ to: "/measurement" });
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <BackButton />

        <section className="rounded-3xl bg-card px-5 py-5">
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Select your activity status :
          </h2>
          <div className="mt-3 space-y-1">
            {(Object.keys(ACTIVITY_LABELS) as ActivityStatus[]).map((value) => (
              <RadioOption
                key={value}
                name="activityStatus"
                value={value}
                label={ACTIVITY_LABELS[value]}
                checked={activityStatus === value}
                onSelect={(v) => {
                  setActivityStatus(v as ActivityStatus);
                  setError(null);
                }}
              />
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-card px-5 py-5">
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Select physical / emotional status :
          </h2>
          <div className="mt-3 space-y-1">
            {(Object.keys(PHYSICAL_LABELS) as PhysicalStatus[]).map((value) => (
              <RadioOption
                key={value}
                name="physicalStatus"
                value={value}
                label={PHYSICAL_LABELS[value]}
                checked={physicalStatus === value}
                onSelect={(v) => {
                  setPhysicalStatus(v as PhysicalStatus);
                  setError(null);
                }}
              />
            ))}
          </div>
        </section>

        <UsefulValues />

        {error && (
          <p role="alert" className="text-center text-sm text-status-attention">
            {error}
          </p>
        )}

        <PrimaryButton className="block" onClick={start}>
          Start Measurement
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
