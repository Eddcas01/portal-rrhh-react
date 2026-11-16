import { useMemo, useState } from "react";
import { Plus, Search, ChevronDown, CheckCircle2, X, Inbox } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  SegmentedControl,
  type Segmento,
} from "@/components/ui/SegmentedControl";
import { NuevaGestion } from "./NuevaGestion";
import { cn, formatearFecha } from "@/lib/utils";
import {
  historialGestiones,
  type Gestion,
  type Situacion,
} from "@/data/mock";
import type { NuevaGestionData } from "./tipos";

type Filtro = "todas" | "En Proceso" | "Aceptada" | "Rechazada";

function resumen(g: Gestion): string {
  const val = (n: string) => g.parametros.find((p) => p.nombre === n)?.valor;
  switch (g.categoria) {
    case "vacaciones":
      return `${val("Fecha desde")} a ${val("Fecha hasta")}, ${val("Cantidad de días")} días`;
    case "constancia":
      return `${val("Tipo")}`;
    case "horas-extra":
      return `${val("Fecha")}, ${val("Horas")} horas`;
    case "ausentismo":
      return `${val("Tipo")}, ${val("Fecha")}`;
    case "anulacion-vacaciones":
      return `${val("Motivo")}`;
    default:
      return g.parametros.map((p) => p.valor).join(", ");
  }
}

export function GestionesPage() {
  const [gestiones, setGestiones] = useState<Gestion[]>(historialGestiones);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [expandida, setExpandida] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [recienId, setRecienId] = useState<number | null>(null);

  const conteos = useMemo(() => {
    const c: Record<Situacion, number> = {
      "En Proceso": 0,
      Aceptada: 0,
      Rechazada: 0,
    };
    gestiones.forEach((g) => (c[g.situacion] += 1));
    return c;
  }, [gestiones]);

  const segmentos: Segmento<Filtro>[] = [
    { valor: "todas", etiqueta: "Todas", contador: gestiones.length },
    { valor: "En Proceso", etiqueta: "En proceso", contador: conteos["En Proceso"] },
    { valor: "Aceptada", etiqueta: "Aceptadas", contador: conteos.Aceptada },
    { valor: "Rechazada", etiqueta: "Rechazadas", contador: conteos.Rechazada },
  ];

  const lista = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return gestiones.filter((g) => {
      if (filtro !== "todas" && g.situacion !== filtro) return false;
      if (!q) return true;
      return (
        g.tipo.toLowerCase().includes(q) ||
        String(g.id).includes(q) ||
        g.parametros.some((p) => p.valor.toLowerCase().includes(q))
      );
    });
  }, [gestiones, filtro, busqueda]);

  function crear(data: NuevaGestionData) {
    const nueva: Gestion = {
      id: Math.max(...gestiones.map((g) => g.id)) + 1,
      categoria: data.categoria,
      tipo: data.tipo,
      fecha: new Date().toISOString().slice(0, 10),
      situacion: "En Proceso",
      parametros: data.parametros,
    };
    setGestiones((prev) => [nueva, ...prev]);
    setModal(false);
    setFiltro("todas");
    setRecienId(nueva.id);
    window.setTimeout(() => setRecienId(null), 6000);
  }

  return (
    <div className="animate-rise space-y-5">
      {recienId && (
        <div className="flex items-center gap-3 rounded-xl border border-success-100 bg-success-50 px-4 py-3">
          <CheckCircle2 className="size-5 shrink-0 text-success-600" />
          <p className="flex-1 text-sm text-success-700">
            Solicitud enviada. Quedó registrada con el número{" "}
            <span className="tnum font-semibold">#{recienId}</span> y está en
            proceso de aprobación.
          </p>
          <button
            type="button"
            onClick={() => setRecienId(null)}
            className="grid size-7 shrink-0 place-items-center rounded-lg text-success-600 transition-colors hover:bg-success-100"
            aria-label="Cerrar aviso"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Barra de herramientas */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="-mx-1 overflow-x-auto px-1 pb-1 lg:pb-0">
          <SegmentedControl
            value={filtro}
            onChange={setFiltro}
            segmentos={segmentos}
          />
        </div>
        <div className="flex items-center gap-2 lg:ml-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              type="search"
              placeholder="Buscar gestión"
              className="h-11 w-full rounded-lg border border-ink-200 bg-white pr-3 pl-9 text-sm text-ink-800 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:outline-none lg:w-56"
            />
          </div>
          <Button variant="accent" onClick={() => setModal(true)}>
            <Plus className="size-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Nueva gestión</span>
            <span className="sm:hidden">Nueva</span>
          </Button>
        </div>
      </div>

      {/* Lista */}
      {lista.length === 0 ? (
        <div className="surface flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
            <Inbox className="size-7" strokeWidth={1.75} />
          </span>
          <p className="mt-4 text-sm font-medium text-ink-800">
            No hay gestiones que coincidan.
          </p>
          <p className="mt-1 text-[13px] text-ink-500">
            Ajusta los filtros o inicia una nueva gestión.
          </p>
        </div>
      ) : (
        <ul className="surface divide-y divide-ink-100 overflow-hidden rounded-2xl">
          {lista.map((g) => {
            const abierta = expandida === g.id;
            return (
              <li
                key={g.id}
                className={cn(
                  "transition-colors",
                  g.id === recienId && "bg-success-50/50"
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandida(abierta ? null : g.id)}
                  className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-ink-50 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[15px] font-medium text-ink-900">
                        {g.tipo}
                      </span>
                      <span className="tnum shrink-0 text-xs text-ink-400">
                        #{g.id}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-ink-500">
                      {resumen(g)}
                    </p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <StatusBadge situacion={g.situacion} />
                    <p className="mt-1 text-[11px] text-ink-400">
                      {formatearFecha(g.fecha)}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-ink-400 transition-transform",
                      abierta && "rotate-180"
                    )}
                  />
                </button>

                {abierta && (
                  <div className="border-t border-ink-100 bg-ink-50/50 px-4 py-4 sm:px-5">
                    <div className="mb-3 flex items-center gap-3 sm:hidden">
                      <StatusBadge situacion={g.situacion} />
                      <span className="text-xs text-ink-400">
                        Solicitada el {formatearFecha(g.fecha)}
                      </span>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {g.parametros.map((p) => (
                        <div
                          key={p.nombre}
                          className="flex justify-between gap-4 border-b border-ink-100 pb-1.5"
                        >
                          <dt className="text-[13px] text-ink-500">
                            {p.nombre}
                          </dt>
                          <dd className="text-[13px] font-medium text-ink-800">
                            {p.valor}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <NuevaGestion
        abierto={modal}
        onClose={() => setModal(false)}
        onCrear={crear}
      />
    </div>
  );
}
