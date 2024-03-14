import useGlobalContext from "../../hooks/useGlobalContext";

function Filter() {
  const { setFilter } = useGlobalContext();
  const regions = ["All", "Africa", "Europe", "Asia", "Oceania", "Americas"];

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <section className="filter">
      <select
        name="region"
        id="region"
        className="select"
        onChange={handleChange}
      >
        <option className="option">Choose A Region</option>
        {regions.map((region) => {
          return (
            <option className="option" value={region} key={region}>
              {region}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default Filter;
