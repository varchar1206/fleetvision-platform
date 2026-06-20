type Props = {
  selectedDriver: string;
  onDriverChange: (value: string) => void;
};

const drivers = [
  "Select Driver",
  "Assign to Self / Owner Operator",
  "Driver 1",
  "Driver 2",
  "Driver 3",
];

export default function DriverAssignment({
  selectedDriver,
  onDriverChange,
}: Props) {
  return (
    <div className="table-card">
      <h2>Driver Assignment</h2>

      <select
        value={selectedDriver}
        onChange={(e) => onDriverChange(e.target.value)}
      >
        {drivers.map((driver) => (
          <option key={driver} value={driver}>
            {driver}
          </option>
        ))}
      </select>
    </div>
  );
}
