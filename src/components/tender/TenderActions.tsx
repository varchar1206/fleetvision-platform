type Props = {
  selectedCount: number;
  batchTenderTime: string;
  onBatchTenderTimeChange: (value: string) => void;
  onSelectAll: () => void;
  onTenderSelected: () => void;
  onRecallSelected: () => void;
};

const batchTimes = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
);

export default function TenderActions({
  selectedCount,
  batchTenderTime,
  onBatchTenderTimeChange,
  onSelectAll,
  onTenderSelected,
  onRecallSelected,
}: Props) {
  return (
    <div className="table-card">
      <h2>Batch Tender Actions</h2>

      <div className="action-row">
        <select
          value={batchTenderTime}
          onChange={(e) => onBatchTenderTimeChange(e.target.value)}
        >
          {batchTimes.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <button onClick={onSelectAll}>Select All / Clear</button>
        <button onClick={onTenderSelected}>Tender Selected</button>
        <button onClick={onRecallSelected}>Recall Selected</button>
      </div>

      <p>{selectedCount} load(s) selected for batch tender.</p>
    </div>
  );
}
