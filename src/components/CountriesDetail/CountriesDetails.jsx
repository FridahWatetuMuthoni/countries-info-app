import "./CountriesDetail.scss";
import { useLocation, Link } from "react-router-dom";
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import axios from "axios";

function CountriesDetails() {
  const location = useLocation();
  const code = location.pathname.split("/")[2];
  const [mapKey, setMapKey] = useState(Date.now());
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      try {
        setLoading(true);
        const url = `https://restcountries.com/v3.1/alpha/${code}`;
        const response = await axios.get(url);
        const data = response.data;
        setState(data[0]);
        setLoading(false);
      } catch (error) {
        setErrMsg("An Error occured when loading the data");
        console.log(error);
        setLoading(false);
      }
    };
    getCountryData();
  }, [code]);

  const center = {
    lat: state?.latlng[0],
    lng: state?.latlng[1],
  };

  const updateMapKey = () => {
    setMapKey(Date.now());
  };

  const mapStyles = {
    width: "100%",
    height: "100vh",
  };

  if (loading) {
    return (
      <section className="content-wrapper">
        <h1>Data Loading, Please Wait ....</h1>
      </section>
    );
  }

  if (errMsg) {
    return (
      <section className="content-wrapper">
        <h1>{errMsg}</h1>
      </section>
    );
  }
  return (
    <section className="details">
      <section className="home-link">
        <Link className="goback-link" to="/" onClick={updateMapKey}>
          <FaArrowCircleLeft />
          Go Back
        </Link>
      </section>
      <section className="detail-content">
        <section className="flag">
          <img src={state?.flags.png} alt={state?.name.common} />
        </section>
        <section className="info">
          <section className="content">
            <h1>{state?.name.common}</h1>
            <div className="contries-details">
              <section>
                <p>
                  Official Name: <span>{state?.name.official}</span>
                </p>
                <p>
                  Population:{" "}
                  <span>{state?.population ? state?.population : "N/A"}</span>
                </p>
                <p>
                  Region: <span>{state?.region ? state?.region : "N/A"}</span>
                </p>
                <p>
                  Sub Region:{" "}
                  <span>{state?.subregion ? state?.subregion : "N/A"}</span>{" "}
                </p>
                <p>
                  Capital:{" "}
                  <span>{state?.capital ? state?.capital[0] : "N/A"}</span>{" "}
                </p>
                <p>
                  Area: <span>{state?.area ? state?.area : "N/A"}</span>{" "}
                </p>
              </section>
              <section>
                <p>
                  Independent:{" "}
                  <span>{state?.independent ? "True" : "False"}</span>{" "}
                </p>
                <p>
                  LandLocked:{" "}
                  <span>{state?.landlocked ? "True" : "False"}</span>{" "}
                </p>
                <p>
                  UN Member: <span>{state?.unMember ? "True" : "False"}</span>{" "}
                </p>
                <p>
                  Currencies:{" "}
                  {state?.languages && Object.entries(state?.currencies)
                    ? Object.entries(state?.currencies).map(([key, value]) => (
                        <span key={key}>
                          {value.name}
                          {", "}
                        </span>
                      ))
                    : null}
                </p>
                <p>
                  Languages:{" "}
                  {state?.languages && Object.entries(state?.languages)
                    ? Object.entries(state?.languages).map(([key, value]) => (
                        <span key={key}>
                          {value} {",  "}
                        </span>
                      ))
                    : null}
                </p>
                <p>
                  Continents:{" "}
                  {state?.continents
                    ? state?.continents.map((continent, index) => (
                        <span key={index}>{continent} </span>
                      ))
                    : null}
                </p>
              </section>
            </div>
          </section>
          <div className="borders">
            Borders:{" "}
            <section className="borders-items">
              {state?.borders
                ? state?.borders.map((border, index) => (
                    <Link
                      to={`/country/${border}`}
                      key={index}
                      className="border-link"
                    >
                      {border}{" "}
                    </Link>
                  ))
                : null}
            </section>
          </div>
        </section>
      </section>
      {/* <section className="map">
        {
          <GoogleMap
            key={mapKey}
            mapContainerStyle={mapStyles}
            zoom={7}
            center={center}
          />
        }
      </section> */}
    </section>
  );
}

export default CountriesDetails;

// //array
// console.log(borders);
