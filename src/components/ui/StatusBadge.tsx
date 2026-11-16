import { cn } from "@/lib/utils";
import type { Situacion } from "@/data/mock";

const estilos: Record<Situacion, string> = {
  Aceptada: "bg-success-50 text-success-700 ring-success-500/20",
  "En Proceso": "bg-warning-50 text-warning-700 ring-warning-500/25",
  Rechazada: "bg-danger-50 text-danger-700 ring-danger-500/20",
};

const punto: Record<Situacion, string> = {
  Aceptada: "bg-success-500",
  "En Proceso": "bg-warning-500",
  Rechazada: "bg-danger-500",
};

export function StatusBadge({
  situacion,
  className,
}: {
  situacion: Situacion;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        estilos[situacion],
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", punto[situacion])} />
      {situacion}
    </span>
  );
}
