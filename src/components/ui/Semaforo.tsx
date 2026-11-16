import { cn } from "@/lib/utils";
import type { Semaforo as Nivel } from "@/data/mock";

const luces: { key: Nivel; color: string; glow: string }[] = [
  { key: "R", color: "bg-danger-500", glow: "shadow-[0_0_10px_2px] shadow-danger-500/60" },
  { key: "A", color: "bg-warning-500", glow: "shadow-[0_0_10px_2px] shadow-warning-500/60" },
  { key: "V", color: "bg-success-500", glow: "shadow-[0_0_10px_2px] shadow-success-500/60" },
];

/** Semáforo literal de 3 luces para el nivel de endeudamiento. */
export function Semaforo({ nivel }: { nivel: Nivel }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-navy-900 px-2.5 py-3">
      {luces.map((l) => {
        const activa = l.key === nivel;
        return (
          <span
            key={l.key}
            className={cn(
              "size-3.5 rounded-full transition-all",
              activa ? cn(l.color, l.glow) : "bg-white/12"
            )}
          />
        );
      })}
    </div>
  );
}
