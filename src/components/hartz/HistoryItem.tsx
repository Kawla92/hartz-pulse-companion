import { StatusSwatch } from "./HeartRateStatus";
import {
  ACTIVITY_LABELS,
  PHYSICAL_LABELS,
  STATUS_LABELS,
  formatDate,
  formatTime,
  type MeasurementRecord,
} from "@/lib/harz";

export function HistoryItem({
  record,
  onSelect,
}: {
  record: MeasurementRecord;
  onSelect: (record: MeasurementRecord) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(record)}
        className="flex w-full items-center gap-3.5 rounded-3xl bg-card px-4 py-3.5 sm:px-5 text-left transition-colors hover:bg-panel-deep focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <StatusSwatch status={record.heartRateStatus} />
        <span className="min-w-0 flex-1">
          <span className="block text-xs leading-4 text-muted-foreground">
            {formatDate(record.timestamp)} · {formatTime(record.timestamp)}
          </span>
          <span className="mt-0.5 block truncate text-[15px] leading-5">
            {ACTIVITY_LABELS[record.activityStatus]} · {PHYSICAL_LABELS[record.physicalStatus]}
          </span>
        </span>
        <span className="text-right">
          <span className="block text-lg font-semibold">{record.heartRate} BPM</span>
          <span className="block text-xs text-muted-foreground">
            {STATUS_LABELS[record.heartRateStatus]}
          </span>
        </span>
      </button>
    </li>
  );
}
