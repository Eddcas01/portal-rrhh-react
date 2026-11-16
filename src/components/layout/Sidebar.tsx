import { NavLink } from "react-router-dom";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Brand } from "./Brand";
import { navPrincipal, navSecundario, type NavItem } from "./nav";
import { cn } from "@/lib/utils";
import { usuario, totalPorAprobar } from "@/data/mock";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onNavigate,
}: SidebarProps) {
  const items = navPrincipal.filter((i) => !i.soloAdmin || usuario.esAdmin);

  return (
    <div className="flex h-full flex-col border-r border-white/[0.06] bg-navy-900">
      {/* Marca */}
      <div
        className={cn(
          "flex h-[68px] items-center",
          collapsed ? "justify-center px-2" : "px-5"
        )}
      >
        <Brand compact={collapsed} />
      </div>

      {/* Etiqueta de sección + colapsar */}
      <div
        className={cn(
          "flex items-center pb-1",
          collapsed ? "justify-center px-2" : "px-5"
        )}
      >
        {!collapsed && (
          <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">
            Menú
          </span>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? "Expandir menú" : "Colapsar menú"}
            aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            className={cn(
              "hidden size-7 place-items-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 lg:grid",
              !collapsed && "ml-auto"
            )}
          >
            {collapsed ? (
              <ChevronsRight className="size-4" />
            ) : (
              <ChevronsLeft className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* Navegación principal */}
      <nav
        className={cn(
          "flex-1 space-y-1 overflow-y-auto overflow-x-hidden py-2",
          collapsed ? "px-2.5" : "px-3"
        )}
      >
        {items.map((item) => (
          <NavRow
            key={item.to}
            item={item}
            collapsed={collapsed}
            badge={item.to === "/aprobaciones" ? totalPorAprobar : item.badge}
            onNavigate={onNavigate}
          />
        ))}

        {/* Grupo secundario */}
        <div
          className={cn(
            "mt-3 border-t border-white/[0.06] pt-3",
            collapsed ? "mx-1" : ""
          )}
        >
          {navSecundario.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              title={collapsed ? enlace.etiqueta : undefined}
              className={cn(
                "group flex items-center rounded-xl text-[14.5px] text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white",
                collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
              )}
            >
              <enlace.icon
                className="size-[19px] shrink-0 text-white/45 transition-colors group-hover:text-white/80"
                strokeWidth={2}
              />
              {!collapsed && <span>{enlace.etiqueta}</span>}
            </a>
          ))}
        </div>
      </nav>

      <div className="h-3" />
    </div>
  );
}

function NavRow({
  item,
  collapsed,
  badge,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  badge?: number;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={onNavigate}
      title={collapsed ? item.etiqueta : undefined}
      className={({ isActive }) =>
        cn(
          "group flex items-center rounded-xl transition-colors",
          collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
          isActive
            ? "bg-white/[0.08] text-white ring-1 ring-white/[0.08] ring-inset"
            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative flex">
            <item.icon
              className={cn(
                "size-[19px] shrink-0 transition-colors",
                isActive
                  ? "text-accent-400"
                  : "text-white/50 group-hover:text-white/80"
              )}
              strokeWidth={2}
            />
            {collapsed && badge ? (
              <span className="absolute -top-1 -right-1.5 size-2 rounded-full bg-accent-500 ring-2 ring-navy-900" />
            ) : null}
          </span>
          {!collapsed && (
            <>
              <span className="flex-1 text-[14.5px]">{item.etiqueta}</span>
              {badge ? (
                <span
                  className={cn(
                    "tnum min-w-5 rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold",
                    item.to === "/aprobaciones"
                      ? "bg-accent-500 text-white"
                      : "bg-white/15 text-white"
                  )}
                >
                  {badge}
                </span>
              ) : null}
            </>
          )}
        </>
      )}
    </NavLink>
  );
}
