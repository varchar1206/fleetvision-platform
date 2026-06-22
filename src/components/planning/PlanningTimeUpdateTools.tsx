type Props = {
  selectedCount: number;
  dispatchTime: string;
  commitmentTime: string;
  travelTime: string;
  onDispatchTimeChange: (value: string) => void;
  onCommitmentTimeChange: (value: string) => void;
  onTravelTimeChange: (value: string) => void;
  onApply: () => void;
};

export default function PlanningTimeUpdateTools({
  selectedCount,
  dispatchTime,
  commitmentTime,
  travelTime,
  onDispatchTimeChange,
  onCommitmentTimeChange,
  onTravelTimeChange,
  onApply,
}: Props) {
  return (
    <div className="table-card">
      <h2>Selected Load Time Updates</h2>

      <div className="action-row">
        <input type="time" value={dispatchTime} onChange={(e) => onDispatchTimeChange(e.target.value)} />
        <input placeholder="Commitment Time" value={commitmentTime} onChange={(e) => onCommitmentTimeChange(e.target.value)} />
        <input placeholder="Travel Time" value={travelTime} onChange={(e) => onTravelTimeChange(e.target.value)} />
        <button onClick={onApply}>Apply to Selected</button>
      </div>

      <p>{selectedCount} selected.</p>
    </div>
  );
}
