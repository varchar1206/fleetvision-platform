import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import { PlatformProvider } from "./platform/context/PlatformProvider";

import ClientPortalShell from "./layouts/portal/ClientPortalShell";
import PortalShellV2 from "./portal/layouts/PortalShellV2";
import PortalPlaceholderPage from "./portal/components/PortalPlaceholderPage";
import ClientPortalHome from "./pages/portal/ClientPortalHome";
import CreateLoadPage from "./pages/portal/CreateLoadPage";
import CompanyProfilePage from "./pages/portal/CompanyProfilePage";
import UserProfilePage from "./pages/portal/UserProfilePage";
import RelationshipsPage from "./pages/portal/RelationshipsPage";
import DocumentsPage from "./pages/portal/DocumentsPage";

import PortalAdminHome from "./pages/portal/admin/PortalAdminHome";
import OrganizationsAdminPage from "./pages/portal/admin/OrganizationsAdminPage";
import RelationshipsAdminPage from "./pages/portal/admin/RelationshipsAdminPage";
import DriversAdminPage from "./pages/portal/admin/DriversAdminPage";
import InvitationsAdminPage from "./pages/portal/admin/InvitationsAdminPage";




import ShipperDashboard from "./pages/shipper/ShipperDashboard";
import Planning from "./pages/shipper/Planning";
import TenderQueue from "./pages/shipper/TenderQueue";
import ActiveLoads from "./pages/shipper/ActiveLoads";
import CompletedLoads from "./pages/shipper/CompletedLoads";
import Exceptions from "./pages/shipper/Exceptions";
import Performance from "./pages/shipper/Performance";
import NotificationCenter from "./pages/notifications/NotificationCenter";
import LoadEventHistory from "./pages/events/LoadEventHistory";
import LocationTracking from "./pages/gps/LocationTracking";
import LocationMaster from "./pages/locations/LocationMaster";
import CommunicationLogPage from "./pages/communications/CommunicationLogPage";
import CommunicationActionsPage from "./pages/communications/CommunicationActionsPage";
import DriverAttestationTestPage from "./pages/communications/DriverAttestationTestPage";
import DeveloperPortal from "./pages/developer/DeveloperPortal";
import CommunicationEngineMonitor from "./pages/developer/CommunicationEngineMonitor";
import AutomationCenter from "./pages/developer/AutomationCenter";
import EventProcessorMonitor from "./pages/developer/EventProcessorMonitor";
import GeofenceSimulator from "./pages/developer/GeofenceSimulator";
import DeliveryDiagnostics from "./pages/developer/DeliveryDiagnostics";
import ClientManagement from "./pages/developer/ClientManagement";
import AppShellV2 from "./layouts/v2/AppShellV2";
import WorkspaceShellV2 from "./layouts/v2/WorkspaceShellV2";
import V2Home from "./pages/v2/V2Home";
import WorkspaceLauncher from "./pages/v2/WorkspaceLauncher";
import V2DeveloperPortal from "./pages/v2/V2DeveloperPortal";
import BrokerWorkspaceHome from "./pages/v2/broker/BrokerWorkspaceHome";
import DispatchWorkspaceHome from "./pages/v2/dispatch/DispatchWorkspaceHome";
import LoadBuilderPage from "./pages/v2/dispatch/LoadBuilderPage";
import ApprovalQueuePage from "./pages/v2/dispatch/ApprovalQueuePage";
import LoadValidationPage from "./pages/v2/dispatch/LoadValidationPage";
import CategoryRulesPage from "./pages/v2/dispatch/CategoryRulesPage";
import LoadUploadPage from "./pages/v2/dispatch/LoadUploadPage";
import CarrierWorkspaceHome from "./pages/v2/carrier/CarrierWorkspaceHome";
import DriverWorkspaceHome from "./pages/v2/driver/DriverWorkspaceHome";
import MobilePortal from "./pages/mobile/MobilePortal";

import BrokerDashboard from "./pages/broker/BrokerDashboard";
import BrokerTenderQueue from "./pages/broker/BrokerTenderQueue";
import CarrierAssignments from "./pages/broker/CarrierAssignments";
import BrokerActiveLoads from "./pages/broker/BrokerActiveLoads";
import BrokerExceptions from "./pages/broker/BrokerExceptions";
import BrokerDocuments from "./pages/broker/BrokerDocuments";
import BrokerPerformance from "./pages/broker/BrokerPerformance";
import CarrierLoadBoard from "./pages/carrier/CarrierLoadBoard";
import DriverLoadBoard from "./pages/driver/DriverLoadBoard";

function App() {
  return (
    <PlatformProvider>
      <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/v2/dispatch" replace />} />
        <Route path="/planning" element={<Navigate to="/v2/dispatch/planning" replace />} />
        <Route path="/tender-queue" element={<Navigate to="/v2/dispatch/tender-queue" replace />} />
        <Route path="/active-loads" element={<Navigate to="/v2/dispatch/active-loads" replace />} />
        <Route path="/completed-loads" element={<Navigate to="/v2/dispatch/completed-loads" replace />} />
        <Route path="/exceptions" element={<Navigate to="/v2/dispatch/exceptions" replace />} />
        <Route path="/performance" element={<Navigate to="/v2/dispatch/performance" replace />} />
        <Route path="/notifications" element={<Navigate to="/v2/dispatch/notifications" replace />} />
        <Route path="/communications" element={<Navigate to="/v2/dispatch/communication-log" replace />} />
        <Route path="/communications/actions" element={<Navigate to="/v2/dispatch/communication-actions" replace />} />
        <Route path="/driver-attestation-test" element={<Navigate to="/v2/dispatch/driver-attestation-test" replace />} />
        <Route path="/events" element={<Navigate to="/v2/dispatch/events" replace />} />
        <Route path="/gps" element={<Navigate to="/v2/dispatch/gps" replace />} />
        <Route path="/locations" element={<Navigate to="/v2/dispatch/locations" replace />} />
        <Route path="/broker" element={<Navigate to="/v2/broker" replace />} />
        <Route path="/broker/tenders" element={<Navigate to="/v2/broker/tenders" replace />} />
        <Route path="/broker/carrier-assignments" element={<Navigate to="/v2/broker/carrier-assignments" replace />} />
        <Route path="/broker/active-loads" element={<Navigate to="/v2/broker/active-loads" replace />} />
        <Route path="/broker/exceptions" element={<Navigate to="/v2/broker/exceptions" replace />} />
        <Route path="/broker/documents" element={<Navigate to="/v2/broker/documents" replace />} />
        <Route path="/broker/performance" element={<Navigate to="/v2/broker/performance" replace />} />
        <Route path="/carrier" element={<Navigate to="/v2/carrier" replace />} />
        <Route path="/driver" element={<Navigate to="/v2/driver" replace />} />
        <Route path="/mobile" element={<Navigate to="/v2/driver" replace />} />

        <Route path="/developer" element={<DeveloperPortal />} />
        <Route path="/v2" element={<AppShellV2 />}>
          <Route index element={<V2Home />} />
          <Route path="workspaces" element={<WorkspaceLauncher />} />
          <Route path="planning" element={<Planning />} />
          <Route path="load-builder" element={<LoadBuilderPage />} />
          <Route path="approval-queue" element={<ApprovalQueuePage />} />
          <Route path="load-upload" element={<LoadUploadPage />} />
          <Route path="category-rules" element={<CategoryRulesPage />} />
          <Route path="load-validation" element={<LoadValidationPage />} />
          <Route path="communications" element={<CommunicationLogPage />} />
          <Route path="communication-actions" element={<CommunicationActionsPage />} />
          <Route path="communication-log" element={<CommunicationLogPage />} />
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
          <Route path="events" element={<LoadEventHistory />} />
          <Route path="gps" element={<LocationTracking />} />
          <Route path="locations" element={<LocationMaster />} />
        </Route>
        <Route path="/v2/developer" element={<WorkspaceShellV2 workspace="developer" />}>
          <Route index element={<V2DeveloperPortal />} />
          <Route path="communication-monitor" element={<CommunicationEngineMonitor />} />
          <Route path="automation-center" element={<AutomationCenter />} />
          <Route path="event-processor" element={<EventProcessorMonitor />} />
          <Route path="geofence-simulator" element={<GeofenceSimulator />} />
          <Route path="delivery-diagnostics" element={<DeliveryDiagnostics />} />
          <Route path="client-management" element={<ClientManagement />} />
        </Route>

        <Route path="/mobile" element={<MobilePortal />} />

        <Route path="/v2/dispatch" element={<WorkspaceShellV2 workspace="dispatch" />}>
          <Route index element={<DispatchWorkspaceHome />} />
          <Route path="dashboard" element={<ShipperDashboard />} />
          <Route path="planning" element={<Planning />} />
          <Route path="load-builder" element={<LoadBuilderPage />} />
          <Route path="approval-queue" element={<ApprovalQueuePage />} />
          <Route path="load-upload" element={<LoadUploadPage />} />
          <Route path="category-rules" element={<CategoryRulesPage />} />
          <Route path="load-validation" element={<LoadValidationPage />} />
          <Route path="tender-queue" element={<TenderQueue />} />
          <Route path="active-loads" element={<ActiveLoads />} />
          <Route path="completed-loads" element={<CompletedLoads />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="performance" element={<Performance />} />
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="communication-actions" element={<CommunicationActionsPage />} />
          <Route path="communication-log" element={<CommunicationLogPage />} />
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
          <Route path="events" element={<LoadEventHistory />} />
          <Route path="gps" element={<LocationTracking />} />
          <Route path="locations" element={<LocationMaster />} />
        </Route>

        <Route path="/v2/broker" element={<WorkspaceShellV2 workspace="broker" />}>
          <Route index element={<BrokerWorkspaceHome />} />
          <Route path="dashboard" element={<BrokerDashboard />} />
          <Route path="tenders" element={<BrokerTenderQueue />} />
          <Route path="carrier-assignments" element={<CarrierAssignments />} />
          <Route path="active-loads" element={<BrokerActiveLoads />} />
          <Route path="exceptions" element={<BrokerExceptions />} />
          <Route path="documents" element={<BrokerDocuments />} />
          <Route path="performance" element={<BrokerPerformance />} />
        </Route>

        <Route path="/v2/carrier" element={<WorkspaceShellV2 workspace="carrier" />}>
          <Route index element={<CarrierWorkspaceHome />} />
          <Route path="dashboard" element={<CarrierLoadBoard />} />
          <Route path="load-board" element={<CarrierLoadBoard />} />
          <Route path="driver-assignments" element={<CarrierLoadBoard />} />
          <Route path="active-loads" element={<CarrierLoadBoard />} />
          <Route path="exceptions" element={<CarrierLoadBoard />} />
          <Route path="performance" element={<CarrierLoadBoard />} />
        </Route>

        <Route path="/v2/driver" element={<WorkspaceShellV2 workspace="driver" />}>
          <Route index element={<DriverWorkspaceHome />} />
          <Route path="dashboard" element={<DriverLoadBoard />} />
          <Route path="load-board" element={<DriverLoadBoard />} />
          <Route path="check-calls" element={<DriverLoadBoard />} />
          <Route path="events" element={<DriverLoadBoard />} />
          <Route path="messages" element={<DriverLoadBoard />} />
        </Route>

        <Route path="/portal/shipper" element={<PortalShellV2 portal="shipper" />}>
          <Route index element={<ClientPortalHome portal="shipper" />} />
          <Route path="company-profile" element={<CompanyProfilePage portalType="SHIPPER" />} />
          <Route path="user-profile" element={<UserProfilePage portalType="SHIPPER" />} />
          <Route path="relationships" element={<RelationshipsPage portalType="SHIPPER" />} />
          
          <Route path="documents" element={<DocumentsPage portalType="SHIPPER" />} />
          <Route path="create-load" element={<CreateLoadPage />} />
          <Route path="planning" element={<PortalPlaceholderPage title="Planning" description="Plan upcoming shipments, preferred lanes, and freight capacity needs." />} />
          <Route path="my-loads" element={<PortalPlaceholderPage title="My Loads" description="View current, upcoming, and completed shipper loads." />} />
          <Route path="tracking" element={<PortalPlaceholderPage title="Tracking" description="Track shipments, milestones, exceptions, and delivery status." />} />
          <Route path="messages" element={<PortalPlaceholderPage title="Messages" description="Communicate with brokers, carriers, and FleetVision support." />} />
          <Route path="onboarding" element={<PortalPlaceholderPage title="Onboarding Center" description="Manage company onboarding tasks, invitations, and account setup progress." />} />
          <Route path="settings" element={<PortalPlaceholderPage title="Settings" description="Manage portal preferences, notifications, and account settings." />} />
        </Route>

        <Route path="/portal/broker" element={<PortalShellV2 portal="broker" />}>
          <Route index element={<ClientPortalHome portal="broker" />} />
          <Route path="company-profile" element={<CompanyProfilePage portalType="BROKER" />} />
          <Route path="user-profile" element={<UserProfilePage portalType="BROKER" />} />
          <Route path="relationships" element={<RelationshipsPage portalType="BROKER" />} />
          
          <Route path="documents" element={<DocumentsPage portalType="BROKER" />} />
          <Route path="tender-queue" element={<PortalPlaceholderPage title="Tender Queue" description="Review incoming tenders and customer load opportunities." />} />
          <Route path="carrier-assignments" element={<PortalPlaceholderPage title="Carrier Assignments" description="Assign trusted carriers to active brokered loads." />} />
          <Route path="active-loads" element={<PortalPlaceholderPage title="Active Loads" description="Monitor active broker-managed freight from pickup to delivery." />} />
          <Route path="messages" element={<PortalPlaceholderPage title="Messages" description="Communicate with shippers, carriers, drivers, and FleetVision support." />} />
          <Route path="performance" element={<PortalPlaceholderPage title="Performance" description="Review service metrics, carrier performance, and network trends." />} />
          <Route path="onboarding" element={<PortalPlaceholderPage title="Onboarding Center" description="Manage onboarding tasks, organization setup, and partner invitations." />} />
          <Route path="settings" element={<PortalPlaceholderPage title="Settings" description="Manage broker portal preferences, notifications, and account settings." />} />
        </Route>

        <Route path="/portal/carrier" element={<PortalShellV2 portal="carrier" />}>
          <Route index element={<ClientPortalHome portal="carrier" />} />
          <Route path="company-profile" element={<CompanyProfilePage portalType="CARRIER" />} />
          <Route path="user-profile" element={<UserProfilePage portalType="CARRIER" />} />
          <Route path="relationships" element={<RelationshipsPage portalType="CARRIER" />} />
          
          <Route path="documents" element={<DocumentsPage portalType="CARRIER" />} />
          <Route path="load-board" element={<PortalPlaceholderPage title="Load Board" description="Review available loads and carrier freight opportunities." />} />
          <Route path="driver-assignments" element={<PortalPlaceholderPage title="Driver Assignments" description="Assign drivers to loads and manage dispatch coverage." />} />
          <Route path="fleet" element={<PortalPlaceholderPage title="Fleet" description="Review fleet status, driver availability, and operational capacity." />} />
          <Route path="equipment" element={<PortalPlaceholderPage title="Equipment" description="Manage tractors, trailers, equipment details, and availability." />} />
          <Route path="compliance" element={<PortalPlaceholderPage title="Compliance" description="Track insurance, authority, safety, and document compliance." />} />
          <Route path="performance" element={<PortalPlaceholderPage title="Performance" description="Review carrier performance, service metrics, and reliability trends." />} />
          <Route path="onboarding" element={<PortalPlaceholderPage title="Onboarding Center" description="Manage carrier onboarding tasks, documents, and invitations." />} />
          <Route path="settings" element={<PortalPlaceholderPage title="Settings" description="Manage carrier portal preferences, notifications, and account settings." />} />
        </Route>

        <Route path="/portal/driver" element={<PortalShellV2 portal="driver" />}>
          <Route index element={<ClientPortalHome portal="driver" />} />
          <Route path="company-profile" element={<CompanyProfilePage portalType="DRIVER" />} />
          <Route path="user-profile" element={<UserProfilePage portalType="DRIVER" />} />
          <Route path="relationships" element={<RelationshipsPage portalType="DRIVER" />} />
          
          <Route path="documents" element={<DocumentsPage portalType="DRIVER" />} />
          <Route path="todays-loads" element={<PortalPlaceholderPage title="Today&apos;s Loads" description="Review today's assigned loads, stops, and delivery requirements." />} />
          <Route path="navigation" element={<PortalPlaceholderPage title="Navigation" description="Access route guidance, stop details, and location updates." />} />
          <Route path="messages" element={<PortalPlaceholderPage title="Messages" description="Communicate with dispatch, support, and operations teams." />} />
          <Route path="load-history" element={<PortalPlaceholderPage title="Load History" description="Review completed driver loads and shipment history." />} />
          <Route path="inspections" element={<PortalPlaceholderPage title="Inspections" description="Track inspections, vehicle checks, and safety records." />} />
          <Route path="settings" element={<PortalPlaceholderPage title="Settings" description="Manage driver portal preferences, notifications, and account settings." />} />
        </Route>

        <Route path="/portal/admin" element={<ClientPortalShell portal="broker" />}>
          <Route index element={<PortalAdminHome />} />
          <Route path="organizations" element={<OrganizationsAdminPage />} />
          <Route path="relationships" element={<RelationshipsAdminPage />} />
          <Route path="drivers" element={<DriversAdminPage />} />
          <Route path="invitations" element={<InvitationsAdminPage />} />
        </Route>

      </Routes>
      </HashRouter>
    </PlatformProvider>
  );
}

export default App;
