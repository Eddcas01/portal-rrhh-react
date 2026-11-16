interface RingProps {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
}

/** Anillo radial para los días de vacaciones. */
export function Ring({ value, max, size = 92, stroke = 9 }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = c * (1 - pct);

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value} de ${max} días de vacaciones disponibles`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-ink-200)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display tnum text-xl font-semibold leading-none text-ink-900">
          {value}
        </span>
        <span className="tnum mt-0.5 text-[11px] text-ink-400">de {max}</span>
      </div>
    </div>
  );
}
