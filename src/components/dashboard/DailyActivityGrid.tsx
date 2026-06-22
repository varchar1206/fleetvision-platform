import type { Schema } from "../../../amplify/data/resource";
import PlanningEtaCell from "../planning/PlanningEtaCell";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function DailyActivityGrid({ loads }: Props) {
  return (
    <div className="table-card">
      <h2>Today's Load Activity</h2>

      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Dispatch Date</th>
            <th>Dispatch Time</th>
            <th>Broker</th>
            <th>Carrier</th>
            <th>Rate</th>
            <th>Status</th>
            <th>ETA</th>
          </tr>
        </thead>

        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>{load.storeNumber}</td>
              <td>{load.dispatchDate}</td>
              <td>{load.tripId}</td>
              <td>{load.brokerName}</td>
              <td>{load.carrierName}</td>
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
