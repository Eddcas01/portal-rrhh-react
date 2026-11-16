import { cn } from "@/lib/utils";

export interface Segmento<T extends string> {
  valor: T;
  etiqueta: string;
  contador?: number;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  segmentos: Segmento<T>[];
  className?: string;
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  segmentos,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl border border-ink-200 bg-white p-1",
        className
      )}
    >
      {segmentos.map((s) => {
        const activo = s.valor === value;
        return (
          <button
            key={s.valor}
            type="button"
            onClick={() => onChange(s.valor)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
              activo
                ? "bg-brand-500 text-white shadow-sm"
                : "text-ink-600 hover:bg-ink-100"
            )}
          >
            {s.etiqueta}
            {s.contador !== undefined && (
              <span
                className={cn(
                  "tnum text-[11px]",
                  activo ? "text-white/80" : "text-ink-400"
                )}
              >
                {s.contador}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
