import type { Schema } from "../../../amplify/data/resource";

type DriverLocationRecord = Schema["DriverLocation"]["type"];

type Props = {
  locations: DriverLocationRecord[];
};

export default function LocationGrid({ locations }: Props) {
  return (
    <div className="table-card">
      <h2>Driver Location Updates</h2>

      <table>
        <thead>
          <tr>
            <th>Load ID</th>
            <th>Driver</th>
            <th>Carrier</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Recorded At</th>
            <th>Source</th>
          </tr>
        </thead>

        <tbody>
          {locations.map((item) => (
            <tr key={item.id}>
              <td>{item.loadId}</td>
              <td>{item.driverName}</td>
              <td>{item.carrierName}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.recordedAt}</td>
              <td>{item.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
