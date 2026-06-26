import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";

export default function LoadValidationPage() {
  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Load Validation</h2>
          <p>Review validation errors, warnings, duplicate trips, missing data, and readiness before approval submission.</p>
        </div>
      </div>

      <div className="card">
        <h2>Validation Summary</h2>
        <p>ValidationService will own all load validation rules.</p>
      </div>
    </section>
  );
}
