type Props = {
  title: string;
  description: string;
};

export default function PortalPlaceholderPage({ title, description }: Props) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="card">
        <h2>Coming Soon</h2>
        <p>This portal module is reserved for the next customer experience build.</p>
      </div>
    </section>
  );
}
