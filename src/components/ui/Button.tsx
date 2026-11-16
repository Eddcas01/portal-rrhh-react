import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variante = "primary" | "accent" | "outline" | "ghost";
type Tamano = "sm" | "md";

const variantes: Record<Variante, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
  accent: "bg-accent-500 text-white hover:bg-accent-600 shadow-sm",
  outline: "border border-ink-200 bg-white text-ink-700 hover:bg-ink-50",
  ghost: "text-ink-600 hover:bg-ink-100",
};

const tamanos: Record<Tamano, string> = {
  sm: "h-9 px-3 text-[13px] gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variante;
  size?: Tamano;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantes[variant],
        tamanos[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
