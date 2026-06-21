import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function HistoricalGrid({ loads }: Props) {
  return (
    <div className="table-card">
      <h2>Historical Load Summary</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Store</th>
            <th>Broker</th>
            <th>Carrier</th>
            <th>Rate</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>{load.dispatchDate}</td>
              <td>{load.storeNumber}</td>
              <td>{load.brokerName}</td>
              <td>{load.carrierName}</td>
              <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
              <td>{load.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
