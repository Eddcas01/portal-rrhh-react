import { cn, colorAvatar, iniciales } from "@/lib/utils";

interface AvatarProps {
  nombre: string;
  semilla?: string | number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
};

export function Avatar({ nombre, semilla, size = "md", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-white select-none",
        colorAvatar(semilla ?? nombre),
        sizes[size],
        className
      )}
      aria-hidden="true"
    >
      {iniciales(nombre)}
    </span>
  );
}
