import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
  selectedLoadIds: string[];
  onToggleSelected: (loadId: string) => void;
};

export default function TenderGrid({ loads, selectedLoadIds, onToggleSelected }: Props) {
  return (
    <div className="table-card">
      <h2>Tender Queue Loads</h2>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Date</th>
            <th>Store</th>
            <th>Dispatch Time</th>
            <th>Activity</th>
            <th>Equipment</th>
            <th>Broker</th>
            <th>Rate</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLoadIds.includes(load.id)}
                  onChange={() => onToggleSelected(load.id)}
                />
              </td>
              <td>{load.dispatchDate}</td>
              <td>{load.storeNumber}</td>
              <td>{load.tripId}</td>
              <td>{load.activityType}</td>
              <td>{load.equipmentType}</td>
              <td>{load.brokerName}</td>
              <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
              <td>{load.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
