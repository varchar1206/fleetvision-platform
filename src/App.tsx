import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShipperLayout from "./layouts/ShipperLayout";
import ShipperDashboard from "./pages/shipper/ShipperDashboard";
import Planning from "./pages/shipper/Planning";
import TenderQueue from "./pages/shipper/TenderQueue";
import ActiveLoads from "./pages/shipper/ActiveLoads";
import CompletedLoads from "./pages/shipper/CompletedLoads";
import Exceptions from "./pages/shipper/Exceptions";
import Performance from "./pages/shipper/Performance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShipperLayout />}>
          <Route index element={<ShipperDashboard />} />
          <Route path="planning" element={<Planning />} />
          <Route path="tender-queue" element={<TenderQueue />} />
          <Route path="active-loads" element={<ActiveLoads />} />
          <Route path="completed-loads" element={<CompletedLoads />} />
          <Route path="exceptions" element={<Exceptions />} />
          <Route path="performance" element={<Performance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
