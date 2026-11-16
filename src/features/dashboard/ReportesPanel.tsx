import { useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { reportes } from "@/data/mock";

export function ReportesPanel() {
  const [filtro, setFiltro] = useState("");

  const lista = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return reportes;
    return reportes.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q)
    );
  }, [filtro]);

  return (
    <Panel titulo="Reportes" bodyClassName="px-3 pb-3">
      <div className="relative mb-2 px-2">
        <Search className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-ink-400" />
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          type="search"
          placeholder="Buscar reporte"
          className="h-10 w-full rounded-lg border border-ink-200 bg-ink-50 pr-3 pl-9 text-sm text-ink-800 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none"
        />
      </div>

      {lista.length === 0 ? (
        <p className="px-3 py-8 text-center text-sm text-ink-400">
          No hay reportes que coincidan con tu búsqueda.
        </p>
      ) : (
        <ul className="max-h-72 overflow-y-auto">
          {lista.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">
                    {r.nombre}
                  </p>
                  <p className="truncate text-xs text-ink-500">
                    {r.descripcion}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-ink-300 group-hover:text-brand-500" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
