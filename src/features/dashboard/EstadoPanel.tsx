import { Panel } from "@/components/ui/Panel";
import { Ring } from "@/components/ui/Ring";
import { Semaforo } from "@/components/ui/Semaforo";
import { cn } from "@/lib/utils";
import { usuario, type Semaforo as Nivel } from "@/data/mock";

const nivelTexto: Record<Nivel, { label: string; clase: string }> = {
  V: { label: "Nivel saludable", clase: "text-success-700" },
  A: { label: "Nivel medio", clase: "text-warning-700" },
  R: { label: "Nivel alto", clase: "text-danger-700" },
};

export function EstadoPanel() {
  const n = nivelTexto[usuario.semaforo];

  return (
    <Panel titulo="Mi estado">
      <div className="flex items-center gap-4">
        <Ring
          value={usuario.diasVacacionesDisponibles}
          max={usuario.diasVacacionesTotales}
        />
        <div>
          <p className="text-sm font-medium text-ink-800">
            Días de vacaciones
          </p>
          <p className="mt-0.5 text-[13px] text-ink-500">
            Disponibles este periodo
          </p>
          <a
            href="#/gestiones/vacaciones"
            className="mt-2 inline-block text-[13px] font-medium text-brand-600 hover:text-brand-700"
          >
            Solicitar vacaciones
          </a>
        </div>
      </div>

      <div className="my-4 h-px bg-ink-100" />

      <div className="flex items-center gap-4">
        <Semaforo nivel={usuario.semaforo} />
        <div>
          <p className="text-sm font-medium text-ink-800">
            Nivel de endeudamiento
          </p>
          <p className={cn("mt-0.5 text-[13px] font-medium", n.clase)}>
            {n.label}
          </p>
        </div>
      </div>
    </Panel>
  );
}
