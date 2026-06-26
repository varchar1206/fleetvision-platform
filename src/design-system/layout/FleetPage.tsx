import type { ReactNode } from "react";

type FleetPageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FleetPage({ title, description, children }: FleetPageProps) {
  return (
    <section className="fleet-page">
      <header className="fleet-page-header">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>

      <div className="fleet-page-body">{children}</div>
    </section>
  );
}
