import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index";
import PlanTrip from "./pages/PlanTrip";
import TripDetails from "./pages/TripDetails";
import Checklist from "./pages/Checklist";
import LanguagePhrases from "./pages/LanguagePhrases";
import EmergencyContacts from "./pages/EmergencyContacts";
import WeatherForecast from "./pages/WeatherForecast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/language-phrases" element={<LanguagePhrases />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/weather-forecast" element={<WeatherForecast />} />
      </Routes>
    </Router>
  );
}

export default App;
