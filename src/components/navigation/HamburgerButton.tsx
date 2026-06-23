type Props = {
  onClick: () => void;
};

export default function HamburgerButton({ onClick }: Props) {
  return (
    <button className="btn btn-secondary v2-menu-button" onClick={onClick}>
      Menu
    </button>
  );
}
