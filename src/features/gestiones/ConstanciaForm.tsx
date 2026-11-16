import { useState } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { fechaCorta } from "@/lib/utils";
import { tiposConstancia } from "@/data/mock";
import type { NuevaGestionData } from "./tipos";

const FORM_ID = "form-gestion";

export function ConstanciaForm({
  onSubmit,
}: {
  onSubmit: (data: NuevaGestionData) => void;
}) {
  const [tipo, setTipo] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [tocado, setTocado] = useState(false);

  const esEmbajada = tipo === "Constancia a Embajada";
  const error = !tipo
    ? "Selecciona el tipo de constancia."
    : !destinatario.trim()
      ? `Indica ${esEmbajada ? "el nombre de la embajada" : "el destinatario"}.`
      : !fechaEmision
        ? "Indica la fecha de emisión."
        : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTocado(true);
    if (error) return;
    onSubmit({
      categoria: "constancia",
      tipo: esEmbajada ? "Constancia a embajada" : "Constancia laboral",
      parametros: [
        { nombre: "Tipo", valor: tipo },
        {
          nombre: esEmbajada ? "Embajada" : "Destinatario",
          valor: destinatario.trim(),
        },
        { nombre: "Fecha de emisión", valor: fechaCorta(fechaEmision) },
      ],
    });
  }

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-4">
      <Field label="Tipo de constancia" htmlFor="tipo-constancia">
        <select
          id="tipo-constancia"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className={inputClass}
          required
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {tiposConstancia.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label={esEmbajada ? "Nombre de la embajada" : "Destinatario"}
        htmlFor="destinatario"
        hint="A quién va dirigida la constancia."
      >
        <input
          id="destinatario"
          type="text"
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
          placeholder={esEmbajada ? "Embajada de…" : "Nombre de la entidad"}
          className={inputClass}
        />
      </Field>

      <Field label="Fecha de emisión" htmlFor="fecha-emision">
        <input
          id="fecha-emision"
          type="date"
          value={fechaEmision}
          onChange={(e) => setFechaEmision(e.target.value)}
          className={inputClass}
          required
        />
      </Field>

      {tocado && error && (
        <p className="rounded-lg bg-danger-50 px-3 py-2 text-[13px] text-danger-700">
          {error}
        </p>
      )}
    </form>
  );
}
