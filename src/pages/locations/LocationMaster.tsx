import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import LocationForm from "../../components/locations/LocationForm";
import LocationGrid from "../../components/locations/LocationGrid";
import LocationMetrics from "../../components/locations/LocationMetrics";
import LocationImportTools from "../../components/locations/LocationImportTools";

const client = generateClient<Schema>();

type LocationRecord = Schema["Location"]["type"];

const emptyForm: Partial<LocationRecord> = {
  storeNumber: "",
  locationName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  commitmentTime: "",
  oneWayTravelTime: "",
  locationType: "STORE",
};

export default function LocationMaster() {
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [form, setForm] = useState<Partial<LocationRecord>>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);

  async function loadLocations() {
    setIsLoading(true);
    const result = await client.models.Location.list();
    setLocations(result.data);
    setIsLoading(false);
  }

  function updateForm(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function saveLocation() {
    if (!form.storeNumber || !form.locationName) {
      alert("Store Number and Location Name are required.");
      return;
    }

    if (form.id) {
      await client.models.Location.update({
        id: form.id,
        storeNumber: form.storeNumber,
        locationName: form.locationName,
        streetAddress: form.streetAddress,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        commitmentTime: form.commitmentTime,
        oneWayTravelTime: form.oneWayTravelTime,
        locationType: form.locationType || "STORE",
      });
    } else {
      await client.models.Location.create({
        storeNumber: form.storeNumber,
        locationName: form.locationName,
        streetAddress: form.streetAddress,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        commitmentTime: form.commitmentTime,
        oneWayTravelTime: form.oneWayTravelTime,
        geofenceRadiusFeet: 500,
        locationType: form.locationType || "STORE",
      });
    }

    setForm(emptyForm);
    await loadLocations();
  }

  async function deleteLocation(location: LocationRecord) {
    if (!confirm(`Delete location ${location.storeNumber}?`)) return;

    await client.models.Location.delete({ id: location.id });
    await loadLocations();
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

      <LocationForm
        form={form}
        onChange={updateForm}
        onSave={saveLocation}
        onCancel={() => setForm(emptyForm)}
      />

      <LocationImportTools onImportComplete={loadLocations} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading locations...</p>
        </div>
      ) : (
        <LocationGrid
          locations={locations}
          onEdit={setForm}
          onDelete={deleteLocation}
        />
      )}
    </section>
  );
}
