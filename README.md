# Project Requirements

## Funcitonality

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

## Endpoints

```text
1. all countries:
https://restcountries.com/v3.1/all

2. Search by country name.
If you want to get an exact match, use the next endpoint. It can be the common or official value:
https://restcountries.com/v3.1/name/{name}
example:
https://restcountries.com/v3.1/name/deutschland

3. FULL NAME
Search by country’s full name. It can be the common or official value
https://restcountries.com/v3.1/name/{name}?fullText=true
https://restcountries.com/v3.1/name/aruba?fullText=true


### Body Copy
- Homepage Items: 14px
- Detail Page: 16px

```

```javascript
import "./CountriesDetail.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import axios from "axios";

function CountriesDetails() {
  const { state } = useLocation();
  console.log(state);
  const [coordinates, setCoordinates] = useState(null);
  const [mapKey, setMapKey] = useState(Date.now());
  const [countryData, setCountryData] = useState(null);
  const nagivate = useNavigate();

  useEffect(() => {
    setCoordinates({
      lat: state?.latlng[0],
      lng: state?.latlng[1],
    });
  }, [state?.latlng]);

  const updateMapKey = () => {
    setMapKey(Date.now());
  };

  const getCountryData = async (code) => {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${code}`;
      const response = await axios.get(url);
      const data = response.data;
      setCountryData(data[0]);
      console.log(data[0]);
      console.log(countryData);
      if (countryData) {
        nagivate(`/country/${countryData?.name?.common}`, {
          state: countryData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mapStyles = {
    width: "100%",
    height: "60vh",
  };

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
            <p>Official Name: {state?.name.official}</p>
            <p>Population: {state?.population ? state?.population : "N/A"}</p>
            <p>Region: {state?.region ? state?.region : "N/A"}</p>
            <p>Sub Region: {state?.subregion ? state?.subregion : "N/A"}</p>
            <p>Capital: {state?.capital ? state?.capital[0] : "N/A"}</p>
            <p>Area: {state?.area ? state?.area : "N/A"}</p>
            <p>Independent: {state?.independent ? "True" : "False"}</p>
            <p>LandLocked: {state?.landlocked ? "True" : "False"}</p>
            <p>UN Member: {state?.unMember ? "True" : "False"}</p>
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
          <div className="borders">
            Borders:{" "}
            <section className="borders-items">
              {state?.borders
                ? state?.borders.map((border, index) => (
                    <Link
                      key={index}
                      className="border-link"
                      onClick={() => getCountryData(border)}
                      state={countryData}
                    >
                      {border}{" "}
                    </Link>
                  ))
                : null}
            </section>
          </div>
        </section>
      </section>
      <section className="map">
        {
          <GoogleMap
            key={mapKey}
            mapContainerStyle={mapStyles}
            zoom={7}
            center={coordinates}
          />
        }
      </section>
    </section>
  );
}

export default CountriesDetails;

// //array
// console.log(borders);
```
