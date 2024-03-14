import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import UseEffectPage from "./pages/UseEffectPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="useEffect" element={<UseEffectPage />} />
        <Route path="country/:countryName" element={<CountryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
