import type { Schema } from "../../../amplify/data/resource";

type LocationRecord = Schema["Location"]["type"];

type Props = {
  locations: LocationRecord[];
};

export default function LocationGrid({ locations }: Props) {
  return (
    <div className="table-card">
      <h2>Location Master</h2>

      <table>
        <thead>
          <tr>
            <th>Store #</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Commitment</th>
            <th>Travel Time</th>
            <th>GPS</th>
          </tr>
        </thead>

        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.storeNumber}</td>
              <td>{location.locationName}</td>
              <td>{location.streetAddress}</td>
              <td>{location.city}</td>
              <td>{location.state}</td>
              <td>{location.commitmentTime}</td>
              <td>{location.oneWayTravelTime}</td>
              <td>{location.latitude && location.longitude ? "Yes" : "Missing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
