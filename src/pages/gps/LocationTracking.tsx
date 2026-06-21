import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import LocationGrid from "../../components/gps/LocationGrid";
import LocationMetrics from "../../components/gps/LocationMetrics";

const client = generateClient<Schema>();

type DriverLocationRecord = Schema["DriverLocation"]["type"];

export default function LocationTracking() {
  const [locations, setLocations] = useState<DriverLocationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadLocations() {
    setIsLoading(true);
    const result = await client.models.DriverLocation.list();
    setLocations(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>GPS Location Tracking</h2>
          <p>Driver location updates for tracking, geofencing, and future map visibility.</p>
        </div>
      </div>

      <LocationMetrics locations={locations} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading location updates...</p>
        </div>
      ) : (
        <LocationGrid locations={locations} />
      )}
    </section>
  );
}
