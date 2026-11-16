import {
  LayoutGrid,
  ClipboardList,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  LifeBuoy,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  etiqueta: string;
  icon: LucideIcon;
  badge?: number;
  soloAdmin?: boolean;
}

/** Navegación principal (rutas de la app). */
export const navPrincipal: NavItem[] = [
  { to: "/", etiqueta: "Inicio", icon: LayoutGrid },
  { to: "/gestiones", etiqueta: "Mis gestiones", icon: ClipboardList },
  { to: "/aprobaciones", etiqueta: "Aprobaciones", icon: CheckCircle2 },
  { to: "/reportes", etiqueta: "Reportes", icon: BarChart3 },
  {
    to: "/administracion",
    etiqueta: "Administración",
    icon: ShieldCheck,
    soloAdmin: true,
  },
];

export interface NavEnlace {
  href: string;
  etiqueta: string;
  icon: LucideIcon;
}

/** Accesos secundarios (no son rutas principales). */
export const navSecundario: NavEnlace[] = [
  { href: "#/ayuda", etiqueta: "Ayuda y soporte", icon: LifeBuoy },
  { href: "#/configuracion", etiqueta: "Configuración", icon: Settings },
];
