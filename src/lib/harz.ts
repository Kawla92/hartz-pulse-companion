export type ActivityStatus = "rest" | "activity";
export type PhysicalStatus = "stress" | "exhaustion" | "illness" | "calm";
export type HeartRateStatus = "normal" | "risky" | "attention";

export const ACTIVITY_LABELS: Record<ActivityStatus, string> = {
  rest: "At rest",
  activity: "In Activity",
};

export const PHYSICAL_LABELS: Record<PhysicalStatus, string> = {
  stress: "Stress",
  exhaustion: "Exhaustion",
  illness: "Illness/Fever",
  calm: "Calm",
};

export const STATUS_LABELS: Record<HeartRateStatus, string> = {
  normal: "Normal",
  risky: "Risky",
  attention: "Attention",
};

export interface MeasurementRecord {
  id: string;
  timestamp: number;
  activityStatus: ActivityStatus;
  physicalStatus: PhysicalStatus;
  heartRate: number;
  heartRateStatus: HeartRateStatus;
}

const HISTORY_KEY = "hartz.history";
const CONTEXT_KEY = "hartz.context";

export interface MeasurementContext {
  activityStatus: ActivityStatus;
  physicalStatus: PhysicalStatus;
}

export function saveContext(ctx: MeasurementContext) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx));
}

export function loadContext(): MeasurementContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CONTEXT_KEY);
    return raw ? (JSON.parse(raw) as MeasurementContext) : null;
  } catch {
    return null;
  }
}

export function loadHistory(): MeasurementRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? (JSON.parse(raw) as MeasurementRecord[]) : [];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.timestamp - a.timestamp) : [];
  } catch {
    return [];
  }
}

export function addToHistory(record: MeasurementRecord) {
  if (typeof window === "undefined") return;
  const next = [record, ...loadHistory()].slice(0, 100);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(HISTORY_KEY);
}

/** Simulated sample value — no sensor is involved. */
export function simulateHeartRate(
  activityStatus: ActivityStatus,
  physicalStatus: PhysicalStatus,
): number {
  const [min, max] = activityStatus === "rest" ? ([55, 115] as const) : ([80, 160] as const);
  const bias: Record<PhysicalStatus, number> = {
    stress: 12,
    exhaustion: 6,
    illness: 14,
    calm: -8,
  };
  const raw = min + Math.random() * (max - min) + bias[physicalStatus];
  return Math.round(Math.min(max, Math.max(min, raw)));
}

/** Simple, easily editable prototype classification. */
export function classifyHeartRate(
  bpm: number,
  activityStatus: ActivityStatus,
): HeartRateStatus {
  if (activityStatus === "rest") {
    if (bpm > 100) return "risky";
    if (bpm < 70) return "attention";
    return "normal";
  }
  // Contextual / illustrative only for in-activity measurements.
  if (bpm > 150) return "risky";
  if (bpm < 90) return "attention";
  return "normal";
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
