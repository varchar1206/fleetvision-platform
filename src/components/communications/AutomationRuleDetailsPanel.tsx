type AutomationRule = {
  name: string;
  trigger: string;
  status: string;
  description: string;
};

type Props = {
  rule: AutomationRule | null;
  onClose: () => void;
};

export default function AutomationRuleDetailsPanel({
  rule,
  onClose,
}: Props) {
  if (!rule) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="page-header">
          <h2>{rule.name}</h2>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h2>Trigger Source</h2>
            <p>{rule.trigger}</p>
          </div>

          <div className="card">
            <h2>Status</h2>
            <p>{rule.status}</p>
          </div>
        </div>

        <div className="table-card">
          <h2>Description</h2>
          <p>{rule.description}</p>
        </div>

        <div className="table-card">
          <h2>Future Integration Path</h2>

          <pre>
SMS / Driver App
        ↓
Automation Engine
        ↓
Communication Engine
        ↓
Communication Log
        ↓
Developer Monitor
          </pre>
        </div>
      </div>
    </div>
  );
}
