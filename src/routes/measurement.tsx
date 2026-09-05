import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { History } from "lucide-react";
import { AppShell } from "@/components/hartz/AppShell";
import { BackButton } from "@/components/hartz/BackButton";
import { MeasurementProgress } from "@/components/hartz/MeasurementProgress";
import { HeartRateStatusLegend } from "@/components/hartz/HeartRateStatus";
import {
  ACTIVITY_LABELS,
  PHYSICAL_LABELS,
  STATUS_LABELS,
  addToHistory,
  classifyHeartRate,
  loadContext,
  simulateHeartRate,
  type HeartRateStatus,
  type MeasurementContext,
} from "@/lib/harz";

export const Route = createFileRoute("/measurement")({
  head: () => ({
    meta: [
      { title: "Simulated measurement – Härtz" },
      {
        name: "description",
        content:
          "Watch a simulated Härtz heart-rate measurement and see how the result is presented in context. Simulated data, not a medical measurement.",
      },
      { property: "og:title", content: "Simulated measurement – Härtz" },
      {
        property: "og:description",
        content:
          "A simulated heart-rate reading presented with contextual classification. Not a medical device.",
      },
    ],
  }),
  component: MeasurementPage,
});

const DURATION_MS = 6000;

function MeasurementPage() {
  const navigate = useNavigate();
  const [context, setContext] = useState<MeasurementContext | null>(null);
  const [progress, setProgress] = useState(0);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [heartRateStatus, setHeartRateStatus] = useState<HeartRateStatus | null>(null);
  const saved = useRef(false);

  useEffect(() => {
    const ctx = loadContext();
    if (!ctx) {
      navigate({ to: "/status" });
      return;
    }
    setContext(ctx);

    const start = performance.now();
    let frame = 0;

    const tick = () => {
      const pct = Math.min(100, ((performance.now() - start) / DURATION_MS) * 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (saved.current) return;
      saved.current = true;
      const bpm = simulateHeartRate(ctx.activityStatus, ctx.physicalStatus);
      const status = classifyHeartRate(bpm, ctx.activityStatus, ctx.physicalStatus);
      setHeartRate(bpm);
      setHeartRateStatus(status);
      addToHistory({
        id: `${Date.now()}`,
        timestamp: Date.now(),
        activityStatus: ctx.activityStatus,
        physicalStatus: ctx.physicalStatus,
        heartRate: bpm,
        heartRateStatus: status,
      });
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [navigate]);

  const done = heartRate !== null && heartRateStatus !== null;

  return (
    <AppShell>
      <div className="space-y-8">
        <BackButton />

        <MeasurementProgress progress={progress} measuring={!done}>
          {done ? (
            <div className="soft-rise">
              <p className="text-4xl font-semibold" aria-live="polite">
                {heartRate}
                <span className="ml-1 text-lg font-normal">BPM</span>
              </p>
              <p className="mt-1 text-base font-medium">{STATUS_LABELS[heartRateStatus!]}</p>
            </div>
          ) : undefined}
        </MeasurementProgress>

        <section className="rounded-3xl bg-card px-5 py-6">
          <h1 className="text-center text-xl font-semibold">Your heart frequency is</h1>
          <div className="mt-5">
            <HeartRateStatusLegend active={heartRateStatus ?? undefined} />
          </div>
          {done && context && (
            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              Simulated value — no sensor is used. Context: {ACTIVITY_LABELS[context.activityStatus]}{" "}
              · {PHYSICAL_LABELS[context.physicalStatus]}.
              {context.activityStatus === "activity" &&
                " In activity, this classification is contextual and illustrative only."}
            </p>
          )}
        </section>

        {done && (
          <button
            type="button"
            onClick={() => navigate({ to: "/history" })}
            className="soft-rise mx-auto flex items-center gap-3 rounded-full px-4 py-2 text-lg font-semibold transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <History aria-hidden className="size-6" />
            Show History
          </button>
        )}
      </div>
    </AppShell>
  );
}
