type Props = {
  searchTerm: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onClear: () => void;
};

export default function ActiveFilters({
  searchTerm,
  dateFilter,
  onSearchChange,
  onDateChange,
  onClear,
}: Props) {
  return (
    <div className="table-card">
      <h2>Search & Filters</h2>

      <div className="action-row">
        <input
          placeholder="Search store, broker, or status"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <input type="date" value={dateFilter} onChange={(e) => onDateChange(e.target.value)} />

        <button onClick={onClear}>Clear Filters</button>
      </div>
    </div>
  );
}
