import { Routes, Route, useLocation } from "react-router-dom";
import { CheckCircle2, BarChart3, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Dashboard } from "@/features/dashboard/Dashboard";
import { GestionesPage } from "@/features/gestiones/GestionesPage";
import { Placeholder } from "@/features/Placeholder";

const titulos: Record<string, string> = {
  "/": "Inicio",
  "/gestiones": "Mis gestiones",
  "/aprobaciones": "Aprobaciones",
  "/reportes": "Reportes",
  "/administracion": "Administración",
};

export default function App() {
  const { pathname } = useLocation();
  const titulo = titulos[pathname] ?? "Inicio";

  return (
    <AppShell titulo={titulo}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gestiones" element={<GestionesPage />} />
        <Route
          path="/aprobaciones"
          element={
            <Placeholder
              icon={CheckCircle2}
              titulo="Aprobaciones"
              descripcion="Revisa y resuelve las gestiones de tu personal a cargo, Recursos Humanos y soporte de agencias."
            />
          }
        />
        <Route
          path="/reportes"
          element={
            <Placeholder
              icon={BarChart3}
              titulo="Reportes"
              descripcion="Consulta reportes de nómina, vacaciones, horas extra, ausentismos y endeudamiento."
            />
          }
        />
        <Route
          path="/administracion"
          element={
            <Placeholder
              icon={ShieldCheck}
              titulo="Administración"
              descripcion="Herramientas administrativas: estado patrimonial, pólizas, cobro de cafetería y envío de boletas."
            />
          }
        />
        <Route
          path="*"
          element={
            <Placeholder
              titulo="Página no encontrada"
              descripcion="La ruta que buscas no existe o fue movida."
            />
          }
        />
      </Routes>
    </AppShell>
  );
}
