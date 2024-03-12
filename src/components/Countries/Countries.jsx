import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Countries({ country }) {
  const { name, population, region, capital, flags, area } = country;

  return (
    <Link className="country" to={`/country/${name.common}`} state={country}>
      <img src={flags.png} alt={name.common} />
      <div className="country-content">
        <h2>{name.common}</h2>
        <p>
          Population: <span>{population}</span>
        </p>
        <p>
          Region: <span>{region}</span>
        </p>
        <p>
          Capital: <span>{capital ? capital[0] : "N/A"}</span>
        </p>
        <p>
          Area: <span>{area}</span>
        </p>
      </div>
    </Link>
  );
}

Countries.propTypes = {
  country: PropTypes.object.isRequired,
};

export default Countries;
