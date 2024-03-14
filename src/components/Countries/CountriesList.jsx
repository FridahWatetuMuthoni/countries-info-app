import "./Countries.scss";
import Countries from "./Countries";
import useGlobalContext from "../../hooks/useGlobalContext";
import FilterSearch from "../Filter-Search/FilterSearch";

function CountriesList() {
  const { loading, errMsg, countries } = useGlobalContext();

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
    <section>
      <FilterSearch />
      <section className="countries">
        {countries && countries.length > 0
          ? countries.map((country) => {
              return <Countries key={country.name.common} country={country} />;
            })
          : null}
      </section>
    </section>
  );
}
export default CountriesList;
