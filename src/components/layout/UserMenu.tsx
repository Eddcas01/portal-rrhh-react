import { useEffect, useRef, useState, type ElementType } from "react";
import { ChevronDown, LogOut, UserRound, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { usuario } from "@/data/mock";

export function UserMenu() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const onClickFuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("mousedown", onClickFuera);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickFuera);
      document.removeEventListener("keydown", onKey);
    };
  }, [abierto]);

  const nombreCorto = usuario.nombre.split(" ").slice(0, 2).join(" ");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={abierto}
        className={cn(
          "flex items-center gap-2 rounded-xl p-1 pr-1.5 transition-colors hover:bg-ink-200/60 sm:pr-2",
          abierto && "bg-ink-200/60"
        )}
      >
        <Avatar
          nombre={usuario.nombre}
          semilla={usuario.codigoEmpleado}
          size="sm"
        />
        <span className="hidden text-left leading-tight lg:block">
          <span className="block text-[13px] font-semibold text-ink-800">
            {nombreCorto}
          </span>
          <span className="tnum block text-[11px] text-ink-500">
            Cód. {usuario.codigoEmpleado}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "hidden size-4 text-ink-400 transition-transform sm:block",
            abierto && "rotate-180"
          )}
        />
      </button>

      {abierto && (
        <div
          role="menu"
          className="surface absolute top-full right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl shadow-pop"
          style={{ animation: "rise .16s ease both" }}
        >
          <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3.5">
            <Avatar nombre={usuario.nombre} semilla={usuario.codigoEmpleado} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">
                {usuario.nombre}
              </p>
              <p className="truncate text-xs text-ink-500">{usuario.puesto}</p>
            </div>
          </div>

          <div className="p-1.5">
            <MenuLink icon={UserRound} label="Datos personales" href="#/datos" />
            <MenuLink icon={Settings} label="Configuración" href="#/configuracion" />
          </div>

          <div className="border-t border-ink-100 p-1.5">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-danger-600 transition-colors hover:bg-danger-50"
            >
              <LogOut className="size-[18px]" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  icon: Icon,
  label,
  href,
}: {
  icon: ElementType;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      role="menuitem"
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-50"
    >
      <Icon className="size-[18px] text-ink-400" strokeWidth={2} />
      {label}
    </a>
  );
}
