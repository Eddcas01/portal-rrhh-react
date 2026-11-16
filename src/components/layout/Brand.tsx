import { cn } from "@/lib/utils";

/**
 * Marca del portal sobre el riel navy. Monograma geométrico (techo + figura)
 * con la chispa turquesa, y wordmark en Bricolage.
 */
export function Brand({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        compact && "justify-center",
        className
      )}
    >
      <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 ring-inset">
        <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
          <path
            d="M4 18V10l8-5.5 8 5.5v8"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 18v-3.2a2.5 2.5 0 0 1 5 0V18"
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            Portal RRHH
          </span>
          <span className="mt-1 text-[12px] font-medium text-brand-200">
            Grupo Nexo
          </span>
        </span>
      )}
    </div>
  );
}
