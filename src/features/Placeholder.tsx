import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

export function Placeholder({
  titulo,
  descripcion,
  icon: Icon = Construction,
}: {
  titulo: string;
  descripcion: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="animate-rise surface flex flex-col items-center justify-center rounded-2xl px-6 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-500">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <h2 className="font-display mt-5 text-xl font-semibold text-ink-900">
        {titulo}
      </h2>
      <p className="mt-2 max-w-md text-sm text-ink-500">{descripcion}</p>
      <span className="mt-5 rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-500">
        En construcción
      </span>
    </div>
  );
}
