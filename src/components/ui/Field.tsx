import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-[13px] font-medium text-ink-700"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-danger-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "h-11 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10";
