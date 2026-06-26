import type { ButtonHTMLAttributes, ReactNode } from "react";

type FleetButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type FleetButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: FleetButtonVariant;
};

export default function FleetButton({
  children,
  variant = "secondary",
  className = "",
  ...props
}: FleetButtonProps) {
  return (
    <button
      className={`fleet-button fleet-button-${variant} ${className}`.trim()}
      type={props.type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
}
