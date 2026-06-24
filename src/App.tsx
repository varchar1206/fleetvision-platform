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
import DriverAttestationTestPage from "./pages/communications/DriverAttestationTestPage";
import DeveloperPortal from "./pages/developer/DeveloperPortal";
import AppShellV2 from "./layouts/v2/AppShellV2";
import V2Home from "./pages/v2/V2Home";
import V2DeveloperPortal from "./pages/v2/V2DeveloperPortal";
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
          <Route path="developer" element={<V2DeveloperPortal />} />
          <Route path="planning" element={<Planning />} />
        </Route>
        <Route path="/mobile" element={<MobilePortal />} />

        <Route path="/" element={<ShipperLayout />}>
          <Route index element={<ShipperDashboard />} />
          <Route path="planning" element={<Planning />} />
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
          <Route path="driver-attestation-test" element={<DriverAttestationTestPage />} />
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
