import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
  selectedLoadId: string;
  onSelectLoad: (loadId: string) => void;
};

export default function DriverLoadBoard({ loads, selectedLoadId, onSelectLoad }: Props) {
  return (
    <div className="table-card">
      <h2>My Loads</h2>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Date</th>
            <th>Store</th>
            <th>Dispatch Time</th>
            <th>Broker</th>
            <th>Carrier</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>
                <input
                  type="radio"
                  checked={selectedLoadId === load.id}
                  onChange={() => onSelectLoad(load.id)}
                />
              </td>
              <td>{load.dispatchDate}</td>
              <td>{load.storeNumber}</td>
              <td>{load.tripId}</td>
              <td>{load.brokerName}</td>
              <td>{load.carrierName}</td>
              <td>{load.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
