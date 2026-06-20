type Props = {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onClear: () => void;
};

export default function TenderFilters({
  searchTerm,
  statusFilter,
  dateFilter,
  onSearchChange,
  onStatusChange,
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

        <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="READY_TO_TENDER">Ready To Tender</option>
          <option value="TENDERED">Tendered</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input type="date" value={dateFilter} onChange={(e) => onDateChange(e.target.value)} />

        <button onClick={onClear}>Clear Filters</button>
      </div>
    </div>
  );
}
