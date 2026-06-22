import type { Schema } from "../../../amplify/data/resource";

type LocationRecord = Schema["Location"]["type"];

type Props = {
  locations: LocationRecord[];
  onEdit: (location: LocationRecord) => void;
  onDelete: (location: LocationRecord) => void;
};

export default function LocationGrid({ locations, onEdit, onDelete }: Props) {
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
            <th>Edit</th>
            <th>Delete</th>
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
              <td><button onClick={() => onEdit(location)}>Edit</button></td>
              <td><button onClick={() => onDelete(location)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
