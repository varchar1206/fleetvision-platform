import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";

export default function LoadUploadPage() {
  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Upload Load File</h2>
          <p>Upload daily load spreadsheets, map columns, validate records, and build load records.</p>
        </div>
      </div>

      <div className="card">
        <h2>Spreadsheet Upload</h2>
        <p>This workflow will import daily load files and convert them into draft operational loads.</p>
      </div>
    </section>
  );
}
