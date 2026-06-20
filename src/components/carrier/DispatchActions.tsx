type Props = {
  selectedCount: number;
  onAssignDriver: () => void;
  onDispatchSelected: () => void;
};

export default function DispatchActions({
  selectedCount,
  onAssignDriver,
  onDispatchSelected,
}: Props) {
  return (
    <div className="table-card">
      <h2>Dispatch Actions</h2>

      <div className="action-row">
        <button onClick={onAssignDriver}>Assign Driver</button>
        <button onClick={onDispatchSelected}>Dispatch Selected</button>
      </div>

      <p>{selectedCount} load(s) selected.</p>
    </div>
  );
}
