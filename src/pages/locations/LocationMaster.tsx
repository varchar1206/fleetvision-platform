import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import LocationGrid from "../../components/locations/LocationGrid";
import LocationMetrics from "../../components/locations/LocationMetrics";

const client = generateClient<Schema>();

type LocationRecord = Schema["Location"]["type"];

export default function LocationMaster() {
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadLocations() {
    setIsLoading(true);
    const result = await client.models.Location.list();
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
          <h2>Location Master</h2>
          <p>Store, warehouse, travel time, commitment time, and future geofence reference data.</p>
        </div>
      </div>

      <LocationMetrics locations={locations} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading locations...</p>
        </div>
      ) : (
        <LocationGrid locations={locations} />
      )}
    </section>
  );
}
