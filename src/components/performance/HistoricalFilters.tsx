type Props = {
  range: string;
  onRangeChange: (value: string) => void;
};

export default function HistoricalFilters({ range, onRangeChange }: Props) {
  return (
    <div className="table-card">
      <h2>Historical Range</h2>

      <div className="action-row">
        <select value={range} onChange={(e) => onRangeChange(e.target.value)}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last 12 Months</option>
        </select>
      </div>
    </div>
  );
}
