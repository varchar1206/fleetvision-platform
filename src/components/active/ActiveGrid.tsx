import type { Schema } from "../../../amplify/data/resource";
import PlanningEtaCell from "../planning/PlanningEtaCell";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function ActiveGrid({ loads }: Props) {
  return (
    <div className="table-card">
      <h2>Active Loads</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Store</th>
            <th>Dispatch Time</th>
            <th>Activity</th>
            <th>Equipment</th>
            <th>Broker</th>
            <th>Rate</th>
            <th>Status</th>
            <th>ETA</th>
          </tr>
        </thead>

        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>{load.dispatchDate}</td>
              <td>{load.storeNumber}</td>
              <td>{load.tripId}</td>
              <td>{load.activityType}</td>
              <td>{load.equipmentType}</td>
              <td>{load.brokerName}</td>
              <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
              <td>{load.status}</td>
              <td>
                <PlanningEtaCell
                  dispatchDate={load.dispatchDate}
                  dispatchTime={load.dispatchWindow}
                  travelTime={load.plannedTravelTime}
                  commitmentTime={load.commitmentTime}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
