import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  abierto: boolean;
  onClose: () => void;
  titulo: string;
  descripcion?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({
  abierto,
  onClose,
  titulo,
  descripcion,
  children,
  footer,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierto, onClose]);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
        style={{ animation: "rise .2s ease both" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={cn(
          "surface relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl shadow-pop sm:m-4 sm:max-w-lg sm:rounded-2xl",
          className
        )}
        style={{ animation: "rise .28s cubic-bezier(.22,1,.36,1) both" }}
      >
        <header className="flex items-start gap-3 border-b border-ink-100 px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink-900">
              {titulo}
            </h2>
            {descripcion && (
              <p className="mt-0.5 text-[13px] text-ink-500">{descripcion}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <footer className="flex items-center justify-end gap-2 border-t border-ink-100 bg-ink-50/60 px-5 py-3.5">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
