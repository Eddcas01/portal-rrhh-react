import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  titulo: string;
  accion?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Realza el panel como superficie principal del flujo. */
  destacado?: boolean;
}

export function Panel({
  titulo,
  accion,
  children,
  className,
  bodyClassName,
  destacado,
}: PanelProps) {
  return (
    <section
      className={cn(
        "surface flex flex-col overflow-hidden rounded-2xl",
        destacado && "shadow-raise",
        className
      )}
    >
      <header className="flex items-center gap-3 px-5 pt-4 pb-3">
        <h2 className="font-display text-[15px] font-semibold tracking-tight text-ink-900">
          {titulo}
        </h2>
        {accion && <div className="ml-auto">{accion}</div>}
      </header>
      <div className={cn("flex-1 px-5 pb-5", bodyClassName)}>{children}</div>
    </section>
  );
}
