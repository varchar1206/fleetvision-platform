import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";

export default function CategoryRulesPage() {
  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Category Rules</h2>
          <p>Manage configurable category rules such as commodity, temperature, commitment time, notes, and instructions.</p>
        </div>
      </div>

      <div className="card">
        <h2>Rule Management</h2>
        <p>Categories like GROC, FF, and PROD will be managed here instead of hard-coded in pages.</p>
      </div>
    </section>
  );
}
