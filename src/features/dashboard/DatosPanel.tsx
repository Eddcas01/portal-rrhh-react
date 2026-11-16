import {
  Pencil,
  MapPin,
  Phone,
  Briefcase,
  Building2,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";
import { Panel } from "@/components/ui/Panel";
import { cn, formatearFecha } from "@/lib/utils";
import {
  usuario,
  estadoPatrimonial,
  vinculaciones,
  type Declaracion,
} from "@/data/mock";

export function DatosPanel() {
  return (
    <Panel
      titulo="Datos personales"
      accion={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-brand-600 transition-colors hover:bg-brand-50"
        >
          <Pencil className="size-3.5" />
          Editar
        </button>
      }
    >
      <dl className="space-y-3">
        <Dato icon={Briefcase} valor={usuario.puesto} />
        <Dato icon={Building2} valor={usuario.centroCosto} />
        <Dato icon={MapPin} valor={usuario.ubicacion} />
        <Dato icon={Phone} valor={usuario.telefono} />
      </dl>

      <div className="mt-5 space-y-2.5">
        <p className="text-[13px] font-medium text-ink-600">
          Declaraciones
        </p>
        <DeclaracionRow titulo="Estado patrimonial" dato={estadoPatrimonial} />
        <DeclaracionRow titulo="Vinculaciones" dato={vinculaciones} />
      </div>
    </Panel>
  );
}

function Dato({
  icon: Icon,
  valor,
}: {
  icon: typeof MapPin;
  valor: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-[18px] shrink-0 text-ink-400" strokeWidth={2} />
      <dd className="text-sm text-ink-700">{valor}</dd>
    </div>
  );
}

function DeclaracionRow({
  titulo,
  dato,
}: {
  titulo: string;
  dato: Declaracion;
}) {
  const alerta = !dato.vigente;
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        alerta ? "border-danger-200 bg-danger-50/60" : "border-ink-200 bg-white"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-ink-800">
          {alerta ? (
            <AlertTriangle className="size-4 text-danger-500" />
          ) : (
            <FileCheck2 className="size-4 text-success-500" />
          )}
          {titulo}
        </span>
        <span
          className={cn(
            "text-xs font-medium",
            alerta ? "text-danger-600" : "text-success-600"
          )}
        >
          {dato.vigente ? "Vigente" : "Vencida"}
        </span>
      </div>
      <p className="mt-1.5 pl-6 text-xs text-ink-500">
        {alerta ? (
          <>Actualizada el {formatearFecha(dato.fecha)}. Requiere renovación.</>
        ) : (
          <>Actualizada el {formatearFecha(dato.fecha)}</>
        )}
      </p>
    </div>
  );
}
