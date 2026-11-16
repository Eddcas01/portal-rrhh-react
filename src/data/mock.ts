/**
 * Datos simulados (mock) del Portal RRHH.
 * Solo frontend: ninguna llamada al backend. Reemplazar por servicios reales
 * cuando se conecte la API.
 */

export type Situacion = "Aceptada" | "En Proceso" | "Rechazada";
export type Semaforo = "V" | "A" | "R";

export interface Usuario {
  codigoEmpleado: number;
  nombre: string;
  puesto: string;
  departamento: string;
  ubicacion: string;
  centroCosto: string;
  direccion: string;
  telefono: string;
  estadoCivil: string;
  empresa: 1 | 4;
  esJefe: boolean;
  esAdmin: boolean;
  semaforo: Semaforo;
  diasVacacionesDisponibles: number;
  diasVacacionesTotales: number;
}

export interface GestionPersonal {
  id: number;
  tipo: string;
  fecha: string; // ISO
  situacion: Situacion;
  detalle?: string;
}

export interface GrupoAprobacion {
  tipo: string;
  cantidad: number;
}

export interface Colaborador {
  codEmpleado: number;
  nombre: string;
  puesto: string;
  ubicacion: string;
}

export interface Reporte {
  nombre: string;
  descripcion: string;
  href: string;
}

export interface Declaracion {
  fecha: string; // ISO
  situacion: Situacion;
  descripcion: string;
  vigente: boolean;
}

export const usuario: Usuario = {
  codigoEmpleado: 10482,
  nombre: "María José Castillo",
  puesto: "Jefe de Operaciones",
  departamento: "Operaciones Centralizadas",
  ubicacion: "Edificio Corporativo, Nivel 6",
  centroCosto: "CC-3102 Operaciones",
  direccion: "Av. Central 100, Ciudad Ejemplo",
  telefono: "+00 5555-0100 ext. 6412",
  estadoCivil: "Casada",
  empresa: 1,
  esJefe: true,
  esAdmin: true,
  semaforo: "V",
  diasVacacionesDisponibles: 11,
  diasVacacionesTotales: 15,
};

export const gestionesPersonales: GestionPersonal[] = [
  {
    id: 1,
    tipo: "Solicitud de vacaciones",
    fecha: "2026-11-04",
    situacion: "En Proceso",
    detalle: "15 al 19 de diciembre, 5 días",
  },
  {
    id: 2,
    tipo: "Constancia laboral",
    fecha: "2026-10-28",
    situacion: "Aceptada",
    detalle: "Constancia con salario",
  },
  {
    id: 3,
    tipo: "Horas extra",
    fecha: "2026-10-21",
    situacion: "Aceptada",
    detalle: "Cierre de mes, 6 horas",
  },
  {
    id: 4,
    tipo: "Estado patrimonial",
    fecha: "2026-10-10",
    situacion: "Aceptada",
    detalle: "Declaración anual",
  },
  {
    id: 5,
    tipo: "Anulación de vacaciones",
    fecha: "2026-09-30",
    situacion: "Rechazada",
    detalle: "Fuera del periodo permitido",
  },
];

export const aprobarPersonalACargo: GrupoAprobacion[] = [
  { tipo: "Vacaciones", cantidad: 4 },
  { tipo: "Horas extra", cantidad: 2 },
  { tipo: "Constancias", cantidad: 1 },
];

export const aprobarRecursosHumanos: GrupoAprobacion[] = [
  { tipo: "Ausentismos", cantidad: 7 },
  { tipo: "Estado patrimonial", cantidad: 3 },
];

export const aprobarSoporteAgencias: GrupoAprobacion[] = [
  { tipo: "Traslados", cantidad: 2 },
];

export const personalACargo: Colaborador[] = [
  {
    codEmpleado: 20311,
    nombre: "Luis Fernando Morales",
    puesto: "Analista de Operaciones Sr.",
    ubicacion: "Nivel 6",
  },
  {
    codEmpleado: 20318,
    nombre: "Ana Lucía Pérez",
    puesto: "Analista de Operaciones",
    ubicacion: "Nivel 6",
  },
  {
    codEmpleado: 20344,
    nombre: "Diego Estuardo Ramírez",
    puesto: "Asistente de Operaciones",
    ubicacion: "Nivel 5",
  },
  {
    codEmpleado: 20390,
    nombre: "Gabriela Hernández",
    puesto: "Coordinadora de Procesos",
    ubicacion: "Nivel 6",
  },
  {
    codEmpleado: 20412,
    nombre: "Carlos Alberto Súchite",
    puesto: "Analista de Conciliaciones",
    ubicacion: "Nivel 5",
  },
];

export const reportes: Reporte[] = [
  {
    nombre: "Nómina por empleado",
    descripcion: "Detalle de transacciones por colaborador",
    href: "#/reporte/nomina",
  },
  {
    nombre: "Vacaciones acumuladas",
    descripcion: "Saldo y proyección por centro de costo",
    href: "#/reporte/vacaciones",
  },
  {
    nombre: "Horas extra del periodo",
    descripcion: "Horas aprobadas y pendientes por área",
    href: "#/reporte/horas-extra",
  },
  {
    nombre: "Ausentismos",
    descripcion: "Faltas, permisos y suspensiones",
    href: "#/reporte/ausentismos",
  },
  {
    nombre: "Estado patrimonial",
    descripcion: "Cumplimiento de declaraciones",
    href: "#/reporte/estado-patrimonial",
  },
  {
    nombre: "Indicadores de endeudamiento",
    descripcion: "Semáforo por colaborador",
    href: "#/reporte/endeudamiento",
  },
  {
    nombre: "Planilla de boletas",
    descripcion: "Envío y acuse de boletas de pago",
    href: "#/reporte/boletas",
  },
];

export const estadoPatrimonial: Declaracion = {
  fecha: "2026-10-10",
  situacion: "Aceptada",
  descripcion: "Aceptada",
  vigente: true,
};

export const vinculaciones: Declaracion = {
  fecha: "2025-08-14",
  situacion: "Aceptada",
  descripcion: "Vencida — requiere actualización",
  vigente: false,
};

export const totalPorAprobar =
  aprobarPersonalACargo.reduce((s, g) => s + g.cantidad, 0) +
  aprobarRecursosHumanos.reduce((s, g) => s + g.cantidad, 0) +
  aprobarSoporteAgencias.reduce((s, g) => s + g.cantidad, 0);

export const totalGestionesEnProceso = gestionesPersonales.filter(
  (g) => g.situacion === "En Proceso"
).length;

/* ------------------------------------------------------------------
   Módulo de Gestiones: historial completo + catálogo de tipos
   ------------------------------------------------------------------ */

export type CategoriaGestion =
  | "vacaciones"
  | "constancia"
  | "horas-extra"
  | "anulacion-vacaciones"
  | "ausentismo"
  | "estado-patrimonial";

export interface ParametroGestion {
  nombre: string;
  valor: string;
}

export interface Gestion {
  id: number;
  categoria: CategoriaGestion;
  tipo: string;
  fecha: string; // ISO — fecha de solicitud
  situacion: Situacion;
  parametros: ParametroGestion[];
}

export const historialGestiones: Gestion[] = [
  {
    id: 1087,
    categoria: "vacaciones",
    tipo: "Solicitud de vacaciones",
    fecha: "2026-11-04",
    situacion: "En Proceso",
    parametros: [
      { nombre: "Fecha desde", valor: "15/12/2026" },
      { nombre: "Fecha hasta", valor: "19/12/2026" },
      { nombre: "Cantidad de días", valor: "5" },
    ],
  },
  {
    id: 1079,
    categoria: "constancia",
    tipo: "Constancia laboral",
    fecha: "2026-10-28",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Tipo", valor: "Constancia de Ingresos General" },
      { nombre: "Destinatario", valor: "Banco Ejemplo" },
      { nombre: "Fecha de emisión", valor: "29/10/2026" },
    ],
  },
  {
    id: 1068,
    categoria: "horas-extra",
    tipo: "Horas extra",
    fecha: "2026-10-21",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Fecha", valor: "20/10/2026" },
      { nombre: "Horas", valor: "6" },
      { nombre: "Motivo", valor: "Cierre de mes" },
    ],
  },
  {
    id: 1054,
    categoria: "estado-patrimonial",
    tipo: "Estado patrimonial",
    fecha: "2026-10-10",
    situacion: "Aceptada",
    parametros: [{ nombre: "Periodo", valor: "2026" }],
  },
  {
    id: 1041,
    categoria: "ausentismo",
    tipo: "Ausentismo",
    fecha: "2026-10-02",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Tipo", valor: "Permiso personal" },
      { nombre: "Fecha", valor: "02/10/2026" },
      { nombre: "Horas", valor: "3" },
    ],
  },
  {
    id: 1033,
    categoria: "constancia",
    tipo: "Constancia a embajada",
    fecha: "2026-09-30",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Tipo", valor: "Constancia a Embajada" },
      { nombre: "Destinatario", valor: "Embajada de Canadá" },
      { nombre: "Fecha de emisión", valor: "01/10/2026" },
    ],
  },
  {
    id: 1021,
    categoria: "anulacion-vacaciones",
    tipo: "Anulación de vacaciones",
    fecha: "2026-09-30",
    situacion: "Rechazada",
    parametros: [
      { nombre: "Gestión", valor: "#1004" },
      { nombre: "Motivo", valor: "Fuera del periodo permitido" },
    ],
  },
  {
    id: 1012,
    categoria: "vacaciones",
    tipo: "Solicitud de vacaciones",
    fecha: "2026-08-18",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Fecha desde", valor: "25/08/2026" },
      { nombre: "Fecha hasta", valor: "29/08/2026" },
      { nombre: "Cantidad de días", valor: "5" },
    ],
  },
  {
    id: 1004,
    categoria: "constancia",
    tipo: "Remuneración total mensual",
    fecha: "2026-07-14",
    situacion: "Aceptada",
    parametros: [
      { nombre: "Tipo", valor: "Remuneración Total Mensual" },
      { nombre: "Destinatario", valor: "Cooperativa Ejemplo" },
      { nombre: "Fecha de emisión", valor: "15/07/2026" },
    ],
  },
];

/** Tipos de constancia disponibles (del portal original). */
export const tiposConstancia = [
  "Constancia de Ingresos General",
  "Constancia a Embajada",
  "Constancia Laboral Sin Remuneración",
  "Remuneración Total Mensual",
  "Remuneración Total Anual",
  "Constancia IVS",
];
