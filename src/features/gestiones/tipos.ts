import {
  Palmtree,
  FileText,
  Clock,
  CalendarX2,
  UserMinus,
  type LucideIcon,
} from "lucide-react";
import type { CategoriaGestion, ParametroGestion } from "@/data/mock";

/** Lo que un formulario entrega al crear una gestión (sin id/fecha/estado). */
export interface NuevaGestionData {
  categoria: CategoriaGestion;
  tipo: string;
  parametros: ParametroGestion[];
}

export interface TipoGestion {
  key: CategoriaGestion;
  nombre: string;
  descripcion: string;
  icon: LucideIcon;
  disponible: boolean;
}

/** Tipos de gestión que un colaborador puede solicitar. */
export const tiposGestion: TipoGestion[] = [
  {
    key: "vacaciones",
    nombre: "Vacaciones",
    descripcion: "Solicita días de descanso con cargo a tu saldo.",
    icon: Palmtree,
    disponible: true,
  },
  {
    key: "constancia",
    nombre: "Constancia",
    descripcion: "Constancia laboral, de ingresos o para embajada.",
    icon: FileText,
    disponible: true,
  },
  {
    key: "horas-extra",
    nombre: "Horas extra",
    descripcion: "Reporta horas trabajadas fuera de tu jornada.",
    icon: Clock,
    disponible: false,
  },
  {
    key: "anulacion-vacaciones",
    nombre: "Anulación de vacaciones",
    descripcion: "Cancela una solicitud de vacaciones aprobada.",
    icon: CalendarX2,
    disponible: false,
  },
  {
    key: "ausentismo",
    nombre: "Ausentismo",
    descripcion: "Registra permisos, faltas o suspensiones.",
    icon: UserMinus,
    disponible: false,
  },
];
