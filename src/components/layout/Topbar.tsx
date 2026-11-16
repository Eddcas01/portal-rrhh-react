import { Menu, Search, Bell } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface TopbarProps {
  titulo: string;
  onOpenMenu: () => void;
}

export function Topbar({ titulo, onOpenMenu }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-200/80 bg-canvas/80 px-4 backdrop-blur-md lg:px-10">
      <button
        type="button"
        onClick={onOpenMenu}
        className="grid size-10 place-items-center rounded-lg text-ink-700 transition-colors hover:bg-ink-200/60 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="size-5" />
      </button>

      <h1 className="font-display text-lg font-semibold tracking-tight text-ink-900">
        {titulo}
      </h1>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Buscar colaborador o gestión"
            className="h-10 w-60 rounded-lg border border-ink-200 bg-white/70 pr-3 pl-9 text-sm text-ink-800 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none xl:w-72"
          />
        </div>

        <button
          type="button"
          className="relative grid size-10 place-items-center rounded-lg text-ink-600 transition-colors hover:bg-ink-200/60"
          aria-label="Notificaciones"
        >
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 size-2 rounded-full bg-accent-500 ring-2 ring-canvas" />
        </button>

        <span className="mx-1 hidden h-7 w-px bg-ink-200 sm:block" />

        <UserMenu />
      </div>
    </header>
  );
}
