import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  titulo: string;
  children: ReactNode;
}

const STORAGE_KEY = "portal-sidebar-collapsed";

export function AppShell({ titulo, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Recupera la preferencia del riel (por visor).
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignora */
      }
      return next;
    });
  }

  return (
    <div className="min-h-dvh bg-canvas">
      {/* Riel fijo (desktop) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden transition-[width] duration-200 ease-out lg:block",
          collapsed ? "lg:w-[76px]" : "lg:w-[264px]"
        )}
      >
        <Sidebar collapsed={collapsed} onToggleCollapse={toggleCollapsed} />
      </aside>

      {/* Drawer (móvil) */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[280px] max-w-[85%] shadow-pop transition-transform duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {menuOpen && (
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-3.5 z-10 grid size-9 place-items-center rounded-lg text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X className="size-5" />
            </button>
          )}
          <Sidebar onNavigate={() => setMenuOpen(false)} />
        </div>
      </div>

      {/* Contenido */}
      <div
        className={cn(
          "transition-[padding] duration-200 ease-out",
          collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]"
        )}
      >
        <Topbar titulo={titulo} onOpenMenu={() => setMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
