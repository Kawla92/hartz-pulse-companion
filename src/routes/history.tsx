import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/hartz/AppShell";
import { BackButton } from "@/components/hartz/BackButton";
import { PrimaryButton } from "@/components/hartz/PrimaryButton";
import { HistoryItem } from "@/components/hartz/HistoryItem";
import { StatusSwatch } from "@/components/hartz/HeartRateStatus";
import {
  ACTIVITY_LABELS,
  PHYSICAL_LABELS,
  STATUS_LABELS,
  clearHistory,
  formatDate,
  formatTime,
  loadHistory,
  type MeasurementRecord,
} from "@/lib/harz";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Measurement history – Härtz" },
      {
        name: "description",
        content:
          "Review your saved simulated Härtz measurements with date, time, context, BPM and classification. Stored only in your browser.",
      },
      { property: "og:title", content: "Measurement history – Härtz" },
      {
        property: "og:description",
        content: "Your simulated Härtz measurements, saved locally in your browser.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MeasurementRecord[]>([]);
  const [selected, setSelected] = useState<MeasurementRecord | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setRecords(loadHistory());
  }, []);

  return (
    <AppShell>
      <div className="space-y-5">
        <BackButton />
        <h1 className="text-xl font-semibold">Measurement history</h1>

        {records.length === 0 ? (
          <div className="space-y-6 rounded-3xl bg-card px-6 py-10 text-center">
            <p className="text-base text-muted-foreground">No measurements yet.</p>
            <PrimaryButton className="block px-8 text-base" onClick={() => navigate({ to: "/status" })}>
              Start a measurement
            </PrimaryButton>
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {records.map((record) => (
                <HistoryItem key={record.id} record={record} onSelect={setSelected} />
              ))}
            </ul>

            {selected && (
              <section className="soft-rise space-y-3 rounded-3xl bg-panel-deep px-5 py-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Measurement details</h2>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Close
                  </button>
                </div>
                <dl className="space-y-2 text-sm">
                  <Row label="Date" value={formatDate(selected.timestamp)} />
                  <Row label="Time" value={formatTime(selected.timestamp)} />
                  <Row label="Activity status" value={ACTIVITY_LABELS[selected.activityStatus]} />
                  <Row
                    label="Physical / emotional status"
                    value={PHYSICAL_LABELS[selected.physicalStatus]}
                  />
                  <Row label="Heart rate" value={`${selected.heartRate} BPM`} />
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Classification</dt>
                    <dd className="flex items-center gap-2">
                      <StatusSwatch status={selected.heartRateStatus} className="size-4" />
                      {STATUS_LABELS[selected.heartRateStatus]}
                    </dd>
                  </div>
                </dl>
                <p className="text-xs text-muted-foreground">
                  Simulated value — not a medical measurement.
                </p>
              </section>
            )}

            {confirming ? (
              <div className="space-y-3 rounded-3xl bg-card px-5 py-5 text-center">
                <p className="text-sm">Clear all saved measurements? This cannot be undone.</p>
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      clearHistory();
                      setRecords([]);
                      setSelected(null);
                      setConfirming(false);
                    }}
                    className="rounded-full bg-status-risky px-5 py-2 text-sm font-medium text-foreground"
                  >
                    Clear history
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className="rounded-full bg-panel-deep px-5 py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="mx-auto block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear history
              </button>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
