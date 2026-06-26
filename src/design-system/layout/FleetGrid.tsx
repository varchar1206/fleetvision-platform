import type { ReactNode } from "react";

type FleetGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

export default function FleetGrid({
  children,
  columns = 2,
  className = "",
}: FleetGridProps) {
  return (
    <div className={`fleet-grid fleet-grid-${columns} ${className}`.trim()}>
      {children}
    </div>
  );
}
