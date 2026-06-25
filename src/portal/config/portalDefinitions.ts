export type PortalKey = "shipper" | "broker" | "carrier" | "driver";
export type PortalType = "SHIPPER" | "BROKER" | "CARRIER" | "DRIVER";

export type PortalNavItem = {
  label: string;
  path: string;
};

export type PortalDefinition = {
  key: PortalKey;
  portalType: PortalType;
  title: string;
  subtitle: string;
  dashboardPath: string;
  branding: {
    productName: string;
    companyName: string;
    companyInitials: string;
    userName: string;
    userRole: string;
    userInitials: string;
    accentColor: string;
  };
  navigation: PortalNavItem[];
};

export const portalDefinitions: Record<PortalKey, PortalDefinition> = {
  shipper: {
    key: "shipper",
    portalType: "SHIPPER",
    title: "Shipper Portal",
    subtitle: "Create loads, manage brokers, add carriers, track freight, and review documents.",
    dashboardPath: "/portal/shipper",
    branding: {
      productName: "FleetVision 365",
      companyName: "Demo Shipper",
      companyInitials: "DS",
      userName: "Sarah Johnson",
      userRole: "Shipping Manager",
      userInitials: "SJ",
      accentColor: "#2563eb",
    },
    navigation: [
      { label: "Dashboard", path: "/portal/shipper" },
      { label: "Create Load", path: "/portal/shipper/create-load" },
      { label: "Planning", path: "/portal/shipper/planning" },
      { label: "My Loads", path: "/portal/shipper/my-loads" },
      { label: "Tracking", path: "/portal/shipper/tracking" },
      { label: "Brokers", path: "/portal/shipper/relationships" },
      { label: "Carriers", path: "/portal/shipper/relationships" },
      { label: "Documents", path: "/portal/shipper/documents" },
      { label: "Messages", path: "/portal/shipper/messages" },
      { label: "Company Profile", path: "/portal/shipper/company-profile" },
      { label: "Users & Roles", path: "/portal/shipper/user-profile" },
      { label: "Onboarding Center", path: "/portal/shipper/onboarding" },
      { label: "Settings", path: "/portal/shipper/settings" },
    ],
  },

  broker: {
    key: "broker",
    portalType: "BROKER",
    title: "Broker Portal",
    subtitle: "Manage tenders, carriers, active loads, documents, and communication.",
    dashboardPath: "/portal/broker",
    branding: {
      productName: "FleetVision 365",
      companyName: "CH Robinson",
      companyInitials: "CR",
      userName: "John Smith",
      userRole: "Broker Manager",
      userInitials: "JS",
      accentColor: "#2563eb",
    },
    navigation: [
      { label: "Dashboard", path: "/portal/broker" },
      { label: "Tender Queue", path: "/portal/broker/tender-queue" },
      { label: "Carrier Assignments", path: "/portal/broker/carrier-assignments" },
      { label: "Active Loads", path: "/portal/broker/active-loads" },
      { label: "Carrier Network", path: "/portal/broker/relationships" },
      { label: "Documents", path: "/portal/broker/documents" },
      { label: "Messages", path: "/portal/broker/messages" },
      { label: "Performance", path: "/portal/broker/performance" },
      { label: "Company Profile", path: "/portal/broker/company-profile" },
      { label: "Users & Roles", path: "/portal/broker/user-profile" },
      { label: "Onboarding Center", path: "/portal/broker/onboarding" },
      { label: "Settings", path: "/portal/broker/settings" },
    ],
  },

  carrier: {
    key: "carrier",
    portalType: "CARRIER",
    title: "Carrier Portal",
    subtitle: "Manage accepted loads, drivers, documents, and dispatch activity.",
    dashboardPath: "/portal/carrier",
    branding: {
      productName: "FleetVision 365",
      companyName: "Swift Transportation",
      companyInitials: "ST",
      userName: "Mike Johnson",
      userRole: "Dispatcher",
      userInitials: "MJ",
      accentColor: "#2563eb",
    },
    navigation: [
      { label: "Dashboard", path: "/portal/carrier" },
      { label: "Load Board", path: "/portal/carrier/load-board" },
      { label: "Driver Assignments", path: "/portal/carrier/driver-assignments" },
      { label: "Drivers", path: "/portal/carrier/relationships" },
      { label: "Fleet", path: "/portal/carrier/fleet" },
      { label: "Equipment", path: "/portal/carrier/equipment" },
      { label: "Compliance", path: "/portal/carrier/compliance" },
      { label: "Documents", path: "/portal/carrier/documents" },
      { label: "Performance", path: "/portal/carrier/performance" },
      { label: "Company Profile", path: "/portal/carrier/company-profile" },
      { label: "Users & Roles", path: "/portal/carrier/user-profile" },
      { label: "Onboarding Center", path: "/portal/carrier/onboarding" },
      { label: "Settings", path: "/portal/carrier/settings" },
    ],
  },

  driver: {
    key: "driver",
    portalType: "DRIVER",
    title: "Driver Portal",
    subtitle: "View assigned loads, check calls, messages, and documents.",
    dashboardPath: "/portal/driver",
    branding: {
      productName: "FleetVision 365",
      companyName: "Demo Driver",
      companyInitials: "DD",
      userName: "Alex Rivera",
      userRole: "Professional Driver",
      userInitials: "AR",
      accentColor: "#2563eb",
    },
    navigation: [
      { label: "Dashboard", path: "/portal/driver" },
      { label: "Today's Loads", path: "/portal/driver/todays-loads" },
      { label: "Navigation", path: "/portal/driver/navigation" },
      { label: "Messages", path: "/portal/driver/messages" },
      { label: "Load History", path: "/portal/driver/load-history" },
      { label: "Documents", path: "/portal/driver/documents" },
      { label: "Inspections", path: "/portal/driver/inspections" },
      { label: "Profile", path: "/portal/driver/user-profile" },
      { label: "Settings", path: "/portal/driver/settings" },
    ],
  },
};
