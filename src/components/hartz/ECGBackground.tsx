const WAVE =
  "M0 60 H40 l6 -10 5 22 6 -46 6 46 5 -22 6 10 H120 l6 -14 5 30 6 -52 6 52 5 -30 6 14 H240";

/** Decorative ECG waveform layer. Low opacity, never affects readability. */
export function ECGBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ecg-drift flex h-full w-[200%] flex-col justify-around gap-10 opacity-[0.14]">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <svg
            key={row}
            viewBox="0 0 240 120"
            preserveAspectRatio="none"
            className="h-16 w-full shrink-0"
          >
            <path
              d={WAVE}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-foreground"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
