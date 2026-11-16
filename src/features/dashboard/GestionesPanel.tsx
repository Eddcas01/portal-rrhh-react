import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn, formatearFecha } from "@/lib/utils";
import {
  gestionesPersonales,
  aprobarPersonalACargo,
  aprobarRecursosHumanos,
  aprobarSoporteAgencias,
  totalPorAprobar,
} from "@/data/mock";

type Tab = "personales" | "aprobar";

const grupos = [
  { titulo: "Personal a cargo", items: aprobarPersonalACargo },
  { titulo: "Recursos Humanos", items: aprobarRecursosHumanos },
  { titulo: "Soporte de agencias", items: aprobarSoporteAgencias },
];

export function GestionesPanel() {
  const [tab, setTab] = useState<Tab>("personales");

  return (
    <Panel
      titulo="Gestiones"
      destacado
      accion={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent-600"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          Nueva gestión
        </button>
      }
      bodyClassName="p-0"
    >
      <div className="flex gap-5 border-b border-ink-100 px-5">
        <TabButton
          activo={tab === "personales"}
          onClick={() => setTab("personales")}
          etiqueta="Mis solicitudes"
          contador={gestionesPersonales.length}
        />
        <TabButton
          activo={tab === "aprobar"}
          onClick={() => setTab("aprobar")}
          etiqueta="Por aprobar"
          contador={totalPorAprobar}
        />
      </div>

      {tab === "personales" ? (
        <ul className="divide-y divide-ink-100">
          {gestionesPersonales.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-ink-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium text-ink-900">
                    {g.tipo}
                  </p>
                  {g.detalle && (
                    <p className="truncate text-[13px] text-ink-500">
                      {g.detalle}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <StatusBadge situacion={g.situacion} />
                  <span className="text-[11px] text-ink-400">
                    {formatearFecha(g.fecha)}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-5 p-5">
          {grupos
            .filter((grupo) => grupo.items.length > 0)
            .map((grupo) => (
              <div key={grupo.titulo}>
                <p className="mb-2 text-[13px] font-medium text-ink-600">
                  {grupo.titulo}
                </p>
                <ul className="space-y-1">
                  {grupo.items.map((item) => (
                    <li key={item.tipo}>
                      <button
                        type="button"
                        className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-brand-50"
                      >
                        <span className="flex-1 text-sm text-ink-800">
                          {item.tipo}
                        </span>
                        <span className="tnum grid min-w-6 place-items-center rounded-full bg-ink-100 px-1.5 text-xs font-semibold text-ink-700 group-hover:bg-brand-100 group-hover:text-brand-700">
                          {item.cantidad}
                        </span>
                        <ChevronRight className="size-4 text-ink-300 group-hover:text-brand-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </Panel>
  );
}

function TabButton({
  activo,
  onClick,
  etiqueta,
  contador,
}: {
  activo: boolean;
  onClick: () => void;
  etiqueta: string;
  contador: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 py-3 text-[15px] transition-colors",
        activo ? "font-medium text-ink-900" : "text-ink-500 hover:text-ink-800"
      )}
    >
      {etiqueta}
      <span
        className={cn(
          "tnum min-w-5 rounded-full px-1.5 text-center text-[11px] font-semibold",
          activo ? "bg-brand-100 text-brand-700" : "bg-ink-100 text-ink-500"
        )}
      >
        {contador}
      </span>
      <span
        className={cn(
          "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-500 transition-opacity",
          activo ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}
