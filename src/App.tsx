import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";


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

      </Routes>
    </HashRouter>
  );
}

export default App;
