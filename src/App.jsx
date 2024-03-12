import Navbar from "./components/Navbar/Navbar";
import CountriesList from "./components/Countries/CountriesList";
import CountriesDetails from "./components/CountriesDetail/CountriesDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<CountriesList />} />
        <Route path="/country/:country" element={<CountriesDetails />} />
      </Routes>
    </>
  );
}

export default App;
