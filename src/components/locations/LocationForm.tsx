import type { Schema } from "../../../amplify/data/resource";

type LocationRecord = Schema["Location"]["type"];

type Props = {
  form: Partial<LocationRecord>;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function LocationForm({ form, onChange, onSave, onCancel }: Props) {
  return (
    <div className="table-card">
      <h2>{form.id ? "Edit Location" : "Add Location"}</h2>

      <div className="action-row">
        <input placeholder="Store Number" value={form.storeNumber || ""} onChange={(e) => onChange("storeNumber", e.target.value)} />
        <input placeholder="Location Name" value={form.locationName || ""} onChange={(e) => onChange("locationName", e.target.value)} />
        <input placeholder="Street Address" value={form.streetAddress || ""} onChange={(e) => onChange("streetAddress", e.target.value)} />
        <input placeholder="City" value={form.city || ""} onChange={(e) => onChange("city", e.target.value)} />
        <input placeholder="State" value={form.state || ""} onChange={(e) => onChange("state", e.target.value)} />
        <input placeholder="Zip Code" value={form.zipCode || ""} onChange={(e) => onChange("zipCode", e.target.value)} />
        <input placeholder="Commitment Time" value={form.commitmentTime || ""} onChange={(e) => onChange("commitmentTime", e.target.value)} />
        <input placeholder="One Way Travel Time" value={form.oneWayTravelTime || ""} onChange={(e) => onChange("oneWayTravelTime", e.target.value)} />
      </div>

      <div className="action-row">
        <button onClick={onSave}>{form.id ? "Update Location" : "Create Location"}</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
