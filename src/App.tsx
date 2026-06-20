import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShipperLayout from "./layouts/ShipperLayout";
import ShipperDashboard from "./pages/shipper/ShipperDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShipperLayout />}>
          <Route index element={<ShipperDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
