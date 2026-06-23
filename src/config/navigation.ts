export const navigationGroups = [
  {
    title: "Workspace",
    links: [
      { label: "V2 Dashboard", path: "/v2", icon: "LayoutDashboard" },
      { label: "Developer Portal", path: "/v2/developer", icon: "Code2" },
      { label: "Mobile Portal", path: "/mobile", icon: "Smartphone" },
    ],
  },
  {
    title: "Dispatch",
    links: [
      { label: "Daily Dashboard", path: "/", icon: "Activity" },
      { label: "Planning", path: "/v2/planning", icon: "CalendarDays" },
      { label: "Tender Queue", path: "/tender-queue", icon: "ClipboardList" },
      { label: "Active Loads", path: "/active-loads", icon: "Truck" },
      { label: "Completed Loads", path: "/completed-loads", icon: "CheckCircle2" },
      { label: "Exceptions", path: "/exceptions", icon: "TriangleAlert" },
      { label: "Performance", path: "/performance", icon: "BarChart3" },
    ],
  },
  {
    title: "Partner Portals",
    links: [
      { label: "Broker Portal", path: "/broker", icon: "Handshake" },
      { label: "Carrier Portal", path: "/carrier", icon: "Warehouse" },
      { label: "Driver Portal", path: "/driver", icon: "UserRound" },
    ],
  },
  {
    title: "Visibility",
    links: [
      { label: "Notifications", path: "/notifications", icon: "Bell" },
      { label: "Communication Log", path: "/communications", icon: "MessageSquareText" },
      { label: "Event History", path: "/events", icon: "History" },
      { label: "GPS Tracking", path: "/gps", icon: "MapPinned" },
      { label: "Location Master", path: "/locations", icon: "Map" },
    ],
  },
];
