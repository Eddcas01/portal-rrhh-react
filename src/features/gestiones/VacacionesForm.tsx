import { useMemo, useState } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { cn, diasEntre, fechaCorta } from "@/lib/utils";
import { usuario } from "@/data/mock";
import type { NuevaGestionData } from "./tipos";

const FORM_ID = "form-gestion";

export function VacacionesForm({
  onSubmit,
}: {
  onSubmit: (data: NuevaGestionData) => void;
}) {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tocado, setTocado] = useState(false);

  const saldo = usuario.diasVacacionesDisponibles;
  const sugeridos = useMemo(
    () => (desde && hasta ? diasEntre(desde, hasta) : 0),
    [desde, hasta]
  );
  const dias = cantidad === "" ? sugeridos : Number(cantidad);
  const restante = saldo - (Number.isFinite(dias) ? dias : 0);

  const error =
    !desde || !hasta
      ? "Indica el rango de fechas."
      : hasta < desde
        ? "La fecha de fin no puede ser anterior a la de inicio."
        : dias <= 0
          ? "La cantidad de días debe ser mayor a 0."
          : dias > saldo
            ? "No tienes saldo suficiente de vacaciones."
            : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTocado(true);
    if (error) return;
    onSubmit({
      categoria: "vacaciones",
      tipo: "Solicitud de vacaciones",
      parametros: [
        { nombre: "Fecha desde", valor: fechaCorta(desde) },
        { nombre: "Fecha hasta", valor: fechaCorta(hasta) },
        { nombre: "Cantidad de días", valor: String(dias) },
      ],
    });
  }

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
        <span className="text-sm text-ink-600">Saldo disponible</span>
        <span className="font-display tnum text-base font-semibold text-brand-700">
          {saldo} días
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Fecha de inicio" htmlFor="desde">
          <input
            id="desde"
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Fecha de fin" htmlFor="hasta">
          <input
            id="hasta"
            type="date"
            value={hasta}
            min={desde || undefined}
            onChange={(e) => setHasta(e.target.value)}
            className={inputClass}
            required
          />
        </Field>
      </div>

      <Field
        label="Cantidad de días"
        htmlFor="cantidad"
        hint={
          sugeridos > 0 && cantidad === ""
            ? `Calculado por el rango: ${sugeridos} día${sugeridos === 1 ? "" : "s"}. Puedes ajustarlo (medio día permitido).`
            : "Se permiten medios días (0.5)."
        }
      >
        <input
          id="cantidad"
          type="number"
          min={0.5}
          step={0.5}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder={sugeridos ? String(sugeridos) : "0"}
          className={inputClass}
        />
      </Field>

      <div className="flex items-center justify-between border-t border-ink-100 pt-3 text-sm">
        <span className="text-ink-500">Saldo tras la solicitud</span>
        <span
          className={cn(
            "font-display tnum font-semibold",
            restante < 0 ? "text-danger-600" : "text-ink-900"
          )}
        >
          {restante} días
        </span>
      </div>

      {tocado && error && (
        <p className="rounded-lg bg-danger-50 px-3 py-2 text-[13px] text-danger-700">
          {error}
        </p>
      )}
    </form>
  );
}
