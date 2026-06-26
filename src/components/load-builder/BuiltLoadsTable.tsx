import type { BusinessLoad } from "../../business/loads/models/BusinessLoad";
import FleetCard from "../ui/FleetCard";

type BuiltLoadsTableProps = {
  loads: BusinessLoad[];
};

export default function BuiltLoadsTable({ loads }: BuiltLoadsTableProps) {
  return (
    <FleetCard title="Built Loads">
      {loads.length === 0 ? (
        <p>No loads built yet.</p>
      ) : (
        <div className="fleet-table-wrap">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Category</th>
                <th>Store</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Errors / Warnings</th>
              </tr>
            </thead>
            <tbody>
              {loads.map((load) => (
                <tr key={load.id}>
                  <td>{load.tripId}</td>
                  <td>{load.categoryCode}</td>
                  <td>{load.storeNumber} - {load.storeName}</td>
                  <td>{load.originWarehouseName}</td>
                  <td>{load.destinationName}</td>
                  <td>{load.status}</td>
                  <td>{load.errors.length} / {load.warnings.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </FleetCard>
  );
}
