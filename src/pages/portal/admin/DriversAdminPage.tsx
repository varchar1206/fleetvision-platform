import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];
type DriverProfile = Schema["DriverProfile"]["type"];

const now = () => new Date().toISOString();

export default function DriversAdminPage() {
  const [carriers, setCarriers] = useState<Organization[]>([]);
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);

  const [carrierOrganizationId, setCarrierOrganizationId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  async function loadData() {
    const orgs = await client.models.Organization.list();
    const driverRows = await client.models.DriverProfile.list();

    setCarriers(orgs.data.filter((org) => org.organizationType === "CARRIER"));
    setDrivers(driverRows.data);
  }

  function getCarrierName(id?: string | null) {
    return carriers.find((carrier) => carrier.id === id)?.companyName ?? id ?? "Unknown";
  }

  async function createDriver() {
    if (!carrierOrganizationId || !driverName.trim()) return;

    await client.models.DriverProfile.create({
      carrierOrganizationId,
      driverName,
      phone,
      email,
      status: "ACTIVE",
      createdAt: now(),
      updatedAt: now(),
    });

    setDriverName("");
    setPhone("");
    setEmail("");

    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Drivers</h2>
          <p>Create and manage driver profiles connected to carriers.</p>
        </div>
      </div>

      <div className="card">
        <h2>Create Driver</h2>

        <div style={{ display: "grid", gap: "12px", maxWidth: "700px" }}>
          <select
            value={carrierOrganizationId}
            onChange={(e) => setCarrierOrganizationId(e.target.value)}
          >
            <option value="">Select Carrier</option>
            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.companyName}
              </option>
            ))}
          </select>

          <input
            placeholder="Driver Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={createDriver}>
            Create Driver
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Drivers ({drivers.length})</h2>

        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Carrier</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.driverName}</td>
                <td>{getCarrierName(driver.carrierOrganizationId)}</td>
                <td>{driver.email}</td>
                <td>{driver.phone}</td>
                <td>{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
