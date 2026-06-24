export const navigationGroups = [
  {
    title: "Workspace",
    links: [
      { label: "V2 Dashboard", path: "/v2", icon: "LayoutDashboard" },
      { label: "Workspace Launcher", path: "/v2/workspaces", icon: "LayoutDashboard" },
      { label: "Developer Portal", path: "/v2/developer", icon: "Code2" },
      { label: "Communication Monitor", path: "/v2/communication-monitor", icon: "Activity" },
      { label: "Automation Center", path: "/v2/automation-center", icon: "Workflow" },
      { label: "Event Processor", path: "/v2/event-processor", icon: "GitBranch" },
      { label: "Geofence Simulator", path: "/v2/geofence-simulator", icon: "MapPinned" },
      { label: "Delivery Diagnostics", path: "/v2/delivery-diagnostics", icon: "ShieldCheck" },
      { label: "Mobile Portal", path: "/mobile", icon: "Smartphone" },
    ],
  },
  {
    title: "Dispatch",
    links: [
      { label: "Daily Dashboard", path: "/", icon: "Activity" },
      { label: "Planning", path: "/planning", icon: "CalendarDays" },
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
      { label: "Communication Log", path: "/v2/communications", icon: "MessageSquareText" },
      { label: "Communication Actions", path: "/communications/actions", icon: "Send" },
      { label: "Driver Attestation Test", path: "/v2/driver-attestation-test", icon: "MessageCircleReply" },
      { label: "Event History", path: "/v2/events", icon: "History" },
      { label: "GPS Tracking", path: "/v2/gps", icon: "MapPinned" },
      { label: "Location Master", path: "/v2/locations", icon: "Map" },
    ],
  },
];
