import { ChevronRight } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { Avatar } from "@/components/ui/Avatar";
import { personalACargo } from "@/data/mock";

export function PersonalPanel() {
  return (
    <Panel
      titulo="Personal a cargo"
      accion={
        <span className="tnum rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-600">
          {personalACargo.length}
        </span>
      }
      bodyClassName="px-2 pb-2"
    >
      <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
        {personalACargo.map((p) => (
          <li key={p.codEmpleado}>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink-50"
            >
              <Avatar nombre={p.nombre} semilla={p.codEmpleado} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">
                  {p.nombre}
                </p>
                <p className="truncate text-xs text-ink-500">{p.puesto}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-ink-300 group-hover:text-brand-500" />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
