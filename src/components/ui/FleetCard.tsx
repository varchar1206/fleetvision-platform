import type { ReactNode } from "react";

type FleetCardProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function FleetCard({
  title,
  eyebrow,
  children,
  className = "",
}: FleetCardProps) {
  return (
    <section className={`fleet-card ${className}`.trim()}>
      {(eyebrow || title) && (
        <div className="fleet-card-header">
          {eyebrow && <p className="fleet-eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
        </div>
      )}

      <div className="fleet-card-body">{children}</div>
    </section>
  );
}
