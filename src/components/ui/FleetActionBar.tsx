import type { ReactNode } from "react";

type FleetActionBarProps = {
  children: ReactNode;
  align?: "left" | "right" | "between";
};

export default function FleetActionBar({
  children,
  align = "left",
}: FleetActionBarProps) {
  return <div className={`fleet-action-bar fleet-action-bar-${align}`}>{children}</div>;
}
