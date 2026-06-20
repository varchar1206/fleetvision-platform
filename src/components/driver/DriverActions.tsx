type Props = {
  selectedCount: number;
  onArrivedPickup: () => void;
  onLoaded: () => void;
  onInTransit: () => void;
  onArrivedDelivery: () => void;
  onDelivered: () => void;
};

export default function DriverActions({
  selectedCount,
  onArrivedPickup,
  onLoaded,
  onInTransit,
  onArrivedDelivery,
  onDelivered,
}: Props) {
  return (
    <div className="table-card">
      <h2>Driver Actions</h2>

      <div className="action-row">
        <button onClick={onArrivedPickup}>Arrived Pickup</button>
        <button onClick={onLoaded}>Loaded</button>
        <button onClick={onInTransit}>In Transit</button>
        <button onClick={onArrivedDelivery}>Arrived Delivery</button>
        <button onClick={onDelivered}>Delivered</button>
      </div>

      <p>{selectedCount} selected.</p>
    </div>
  );
}
