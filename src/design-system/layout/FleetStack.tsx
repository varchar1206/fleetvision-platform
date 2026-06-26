import type { ReactNode } from "react";

type FleetStackProps = {
  children: ReactNode;
  className?: string;
};

export default function FleetStack({ children, className = "" }: FleetStackProps) {
  return <div className={`fleet-stack ${className}`.trim()}>{children}</div>;
}
