type Props = {
  selectedCount: number;
  onSelectAll: () => void;
  onAcceptSelected: () => void;
  onRejectSelected: () => void;
};

export default function CarrierActions({
  selectedCount,
  onSelectAll,
  onAcceptSelected,
  onRejectSelected,
}: Props) {
  return (
    <div className="table-card">
      <h2>Carrier Actions</h2>

      <div className="action-row">
        <button onClick={onSelectAll}>Select All / Clear</button>
        <button onClick={onAcceptSelected}>Accept Selected</button>
        <button onClick={onRejectSelected}>Reject Selected</button>
      </div>

      <p>{selectedCount} load(s) selected.</p>
    </div>
  );
}
