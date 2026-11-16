import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GestionesPanel } from "./GestionesPanel";
import { PersonalPanel } from "./PersonalPanel";
import { ReportesPanel } from "./ReportesPanel";
import { DatosPanel } from "./DatosPanel";
import { EstadoPanel } from "./EstadoPanel";
import {
  usuario,
  personalACargo,
  totalPorAprobar,
  totalGestionesEnProceso,
} from "@/data/mock";

function saludo(): string {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

const fechaHoy = new Intl.DateTimeFormat("es-GT", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

export function Dashboard() {
  const primerNombre = usuario.nombre.split(" ")[0];

  return (
    <div className="animate-rise space-y-5">
      {/* Hero: saludo + foco de aprobaciones */}
      <section className="surface overflow-hidden rounded-2xl shadow-raise">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-stretch md:justify-between md:gap-10 md:p-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm text-ink-500 first-letter:uppercase">
              {fechaHoy}
            </p>
            <h2 className="font-display mt-1 text-[28px] leading-tight font-semibold tracking-tight text-ink-900">
              {saludo()}, {primerNombre}.
            </h2>
            <div className="mt-4 flex items-center gap-5">
              <Figura valor={totalGestionesEnProceso} etiqueta="en proceso" />
              <span className="h-9 w-px bg-ink-200" />
              <Figura valor={personalACargo.length} etiqueta="a tu cargo" />
            </div>
          </div>

          <Link
            to="/aprobaciones"
            className="group flex items-center gap-5 rounded-xl bg-accent-50 p-5 ring-1 ring-accent-200/70 ring-inset transition-colors hover:bg-accent-100/70 md:min-w-[290px]"
          >
            <span className="font-display tnum text-5xl font-semibold text-accent-600">
              {totalPorAprobar}
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-medium text-ink-900">
                gestiones por aprobar
              </span>
              <span className="mt-1 flex items-center gap-1 text-[13px] font-medium text-accent-700">
                Revisar pendientes
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* Flujo principal + rail de contexto */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <GestionesPanel />
          <PersonalPanel />
        </div>
        <div className="space-y-5 lg:col-span-4">
          <EstadoPanel />
          <DatosPanel />
          <ReportesPanel />
        </div>
      </div>
    </div>
  );
}

function Figura({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display tnum text-2xl font-semibold text-ink-900">
        {valor}
      </span>
      <span className="text-sm text-ink-500">{etiqueta}</span>
    </div>
  );
}
