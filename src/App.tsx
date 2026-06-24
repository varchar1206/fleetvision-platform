import { HashRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import ShipperLayout from "./layouts/ShipperLayout";
import BrokerLayout from "./layouts/BrokerLayout";

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
import CommunicationMessageWindowPage from "./pages/communications/CommunicationMessageWindowPage";
import CommunicationActionsPage from "./pages/communications/CommunicationActionsPage";
import DriverAttestationTestPage from "./pages/communications/DriverAttestationTestPage";
import DeveloperPortal from "./pages/developer/DeveloperPortal";
import CommunicationEngineMonitor from "./pages/developer/CommunicationEngineMonitor";
import AutomationCenter from "./pages/developer/AutomationCenter";
import EventProcessorMonitor from "./pages/developer/EventProcessorMonitor";
import GeofenceSimulator from "./pages/developer/GeofenceSimulator";
import DeliveryDiagnostics from "./pages/developer/DeliveryDiagnostics";
import AppShellV2 from "./layouts/v2/AppShellV2";
import WorkspaceShellV2 from "./layouts/v2/WorkspaceShellV2";
import V2Home from "./pages/v2/V2Home";
import WorkspaceLauncher from "./pages/v2/WorkspaceLauncher";
import V2DeveloperPortal from "./pages/v2/V2DeveloperPortal";
import BrokerWorkspaceHome from "./pages/v2/broker/BrokerWorkspaceHome";
import MobilePortal from "./pages/mobile/MobilePortal";

import BrokerDashboard from "./pages/broker/BrokerDashboard";
import BrokerTenderQueue from "./pages/broker/BrokerTenderQueue";
import CarrierAssignments from "./pages/broker/CarrierAssignments";
import BrokerActiveLoads from "./pages/broker/BrokerActiveLoads";
import BrokerExceptions from "./pages/broker/BrokerExceptions";
import BrokerDocuments from "./pages/broker/BrokerDocuments";
import BrokerPerformance from "./pages/broker/BrokerPerformance";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/developer" element={<DeveloperPortal />} />
        <Route path="/v2" element={<AppShellV2 />}>
          <Route index element={<V2Home />} />
          <Route path="workspaces" element={<WorkspaceLauncher />} />
          <Route path="developer" element={<V2DeveloperPortal />} />
          <Route path="communication-monitor" element={<CommunicationEngineMonitor />} />
          <Route path="automation-center" element={<AutomationCenter />} />
          <Route path="event-processor" element={<EventProcessorMonitor />} />
          <Route path="geofence-simulator" element={<GeofenceSimulator />} />
          <Route path="delivery-diagnostics" element={<DeliveryDiagnostics />} />
          <Route path="planning" element={<Planning />} />
          <Route path="communications" element={<CommunicationLogPage />} />
          <Route path="communication-actions" element={<CommunicationActionsPage />} />
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
          <Route path="events" element={<LoadEventHistory />} />
          <Route path="gps" element={<LocationTracking />} />
          <Route path="locations" element={<LocationMaster />} />
        </Route>
        <Route path="/mobile" element={<MobilePortal />} />

        <Route path="/" element={<ShipperLayout />}>
          <Route index element={<ShipperDashboard />} />
          <Route path="planning" element={<Planning />} />
          <Route path="communications" element={<CommunicationLogPage />} />
          <Route path="communication-actions" element={<CommunicationActionsPage />} />
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
          <Route path="events" element={<LoadEventHistory />} />
          <Route path="gps" element={<LocationTracking />} />
          <Route path="locations" element={<LocationMaster />} />
          <Route path="tender-queue" element={<TenderQueue />} />
          <Route path="active-loads" element={<ActiveLoads />} />
          <Route path="completed-loads" element={<CompletedLoads />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="performance" element={<Performance />} />
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="events" element={<LoadEventHistory />} />
          <Route path="gps" element={<LocationTracking />} />
          <Route path="locations" element={<LocationMaster />} />
          <Route path="communications" element={<CommunicationLogPage />} />
          <Route path="communications/actions" element={<CommunicationActionsPage />} />
          <Route path="communications/details/:messageId" element={<CommunicationMessageWindowPage />} />
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
        </Route>

        <Route path="/v2/broker" element={<WorkspaceShellV2 workspace="broker" />}>
          <Route index element={<BrokerWorkspaceHome />} />
          <Route path="tenders" element={<BrokerTenderQueue />} />
          <Route path="carrier-assignments" element={<CarrierAssignments />} />
          <Route path="active-loads" element={<BrokerActiveLoads />} />
          <Route path="exceptions" element={<BrokerExceptions />} />
          <Route path="documents" element={<BrokerDocuments />} />
          <Route path="performance" element={<BrokerPerformance />} />
        </Route>

        <Route path="/broker" element={<BrokerLayout />}>
          <Route index element={<BrokerDashboard />} />
          <Route path="tenders" element={<BrokerTenderQueue />} />
          <Route path="carrier-assignments" element={<CarrierAssignments />} />
          <Route path="active-loads" element={<BrokerActiveLoads />} />
          <Route path="exceptions" element={<BrokerExceptions />} />
          <Route path="documents" element={<BrokerDocuments />} />
          <Route path="performance" element={<BrokerPerformance />} />
        </Route>

      </Routes>
    </HashRouter>
  );
}

export default App;
