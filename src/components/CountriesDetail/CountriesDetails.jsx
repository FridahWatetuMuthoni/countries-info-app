import "./CountriesDetail.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function CountriesDetails() {
  const { state } = useLocation();
  console.log(state);
  const {
    name,
    population,
    region,
    subregion,
    capital,
    currencies,
    languages,
    flags,
    borders,
    area,
    maps,
    continents,
    independent,
    landlocked,
    unMember,
  } = state;
  console.log(name.common); //okay
  console.log(name.official); //okay
  console.log(population); //okay
  console.log(region); //okay
  console.log(subregion); //okay
  console.log(capital[0]); //okay
  console.log(flags.png); //okay
  console.log(area); //okay
  console.log(maps.googleMaps); //okay
  console.log(independent); //okay
  console.log(landlocked); //okay
  console.log(unMember); //okay
  //array
  console.log(borders);
  console.log(continents);
  //objects
  console.log(Object.keys(currencies));
  console.log(languages);

  return (
    <section className="Details">
      <section>
        <Link to="/">Go Back</Link>
      </section>
      <section className="detail-content">
        <section className="flag"></section>
        <section className="info"></section>
      </section>
      <section className="map">
        <iframe
          src={maps.googleMaps}
          title="map"
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </section>
  );
}

export default CountriesDetails;
