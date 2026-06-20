type Props = {
  selectedCount: number;
  selectedCarrier: string;
  onCarrierChange: (value: string) => void;
  onSelectAll: () => void;
  onAcceptSelected: () => void;
  onRejectSelected: () => void;
  onAssignCarrier: () => void;
};

const carriers = ["Select Carrier", "Swift", "JB Hunt", "Schneider", "Ryder", "XPO"];

export default function BrokerTenderActions({
  selectedCount,
  selectedCarrier,
  onCarrierChange,
  onSelectAll,
  onAcceptSelected,
  onRejectSelected,
  onAssignCarrier,
}: Props) {
  return (
    <div className="table-card">
      <h2>Broker Actions</h2>

      <div className="action-row">
        <button onClick={onSelectAll}>Select All / Clear</button>
        <button onClick={onAcceptSelected}>Accept Selected</button>
        <button onClick={onRejectSelected}>Reject Selected</button>

        <select value={selectedCarrier} onChange={(e) => onCarrierChange(e.target.value)}>
          {carriers.map((carrier) => (
            <option key={carrier} value={carrier}>{carrier}</option>
          ))}
        </select>

        <button onClick={onAssignCarrier}>Assign Selected to Carrier</button>
      </div>

      <p>{selectedCount} load(s) selected.</p>
    </div>
  );
}
