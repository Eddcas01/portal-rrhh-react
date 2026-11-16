import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Hammer } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { tiposGestion, type NuevaGestionData, type TipoGestion } from "./tipos";
import { VacacionesForm } from "./VacacionesForm";
import { ConstanciaForm } from "./ConstanciaForm";

interface NuevaGestionProps {
  abierto: boolean;
  onClose: () => void;
  onCrear: (data: NuevaGestionData) => void;
}

export function NuevaGestion({ abierto, onClose, onCrear }: NuevaGestionProps) {
  const [tipo, setTipo] = useState<TipoGestion | null>(null);

  // Reinicia al selector cada vez que se abre.
  useEffect(() => {
    if (abierto) setTipo(null);
  }, [abierto]);

  const enPicker = tipo === null;

  function handleCrear(data: NuevaGestionData) {
    onCrear(data);
  }

  const footer = enPicker ? (
    <Button variant="ghost" onClick={onClose}>
      Cancelar
    </Button>
  ) : (
    <>
      <Button
        variant="ghost"
        onClick={() => setTipo(null)}
        className="mr-auto"
      >
        <ChevronLeft className="size-4" />
        Atrás
      </Button>
      {tipo?.disponible && (
        <Button type="submit" form="form-gestion" variant="accent">
          Enviar solicitud
        </Button>
      )}
    </>
  );

  return (
    <Modal
      abierto={abierto}
      onClose={onClose}
      titulo={enPicker ? "Nueva gestión" : tipo!.nombre}
      descripcion={
        enPicker
          ? "Elige el tipo de solicitud que quieres iniciar."
          : tipo!.descripcion
      }
      footer={footer}
    >
      {enPicker ? (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {tiposGestion.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTipo(t)}
              className="group flex items-start gap-3 rounded-xl border border-ink-200 p-3.5 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/50"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink-100 text-ink-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-600">
                <t.icon className="size-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                  {t.nombre}
                  {!t.disponible && (
                    <span className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-medium text-ink-500">
                      Pronto
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs text-ink-500">
                  {t.descripcion}
                </span>
              </span>
              <ChevronRight className="mt-2 size-4 shrink-0 text-ink-300 group-hover:text-brand-500" />
            </button>
          ))}
        </div>
      ) : tipo!.key === "vacaciones" ? (
        <VacacionesForm onSubmit={handleCrear} />
      ) : tipo!.key === "constancia" ? (
        <ConstanciaForm onSubmit={handleCrear} />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">
            <Hammer className="size-7" strokeWidth={1.75} />
          </span>
          <p className="mt-4 text-sm font-medium text-ink-800">
            Este tipo de gestión estará disponible pronto.
          </p>
          <p className="mt-1 max-w-xs text-[13px] text-ink-500">
            Por ahora puedes solicitar vacaciones y constancias desde el portal.
          </p>
        </div>
      )}
    </Modal>
  );
}
