import Navbar from "./components/Navbar/Navbar";
import CountriesList from "./components/Countries/CountriesList";
import CountriesDetails from "./components/CountriesDetail/CountriesDetails";
import { Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const API = "AIzaSyC6Mh9IoVA0t0vJEh7jpCMZl4jtQEkeoJU";

  return (
    <>
      <Navbar />
      <LoadScript googleMapsApiKey={API}>
        <Routes>
          <Route exact path="/" element={<CountriesList />} />
          <Route path="/country/:country" element={<CountriesDetails />} />
        </Routes>
      </LoadScript>
    </>
  );
}

export default App;
