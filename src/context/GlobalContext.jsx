import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [filter, setFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (filter == null) {
      setFilteredData(countries);
    } else if (filter.toLowerCase() === "all") {
      setFilteredData(countries);
    } else {
      const data = countries.filter(
        (country) => country.region.toLowerCase() === filter.toLowerCase()
      );
      setFilteredData(data);
    }
  }, [filter, countries]);

  console.log(filteredData);

  useEffect(() => {
    if (search.trim() !== "") {
      let data = countries.filter(
        (country) => country.name.common.toLowerCase() === search.toLowerCase()
      );
      setFilteredData(data);
    } else {
      setFilteredData(countries);
    }
  }, [search, countries]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const url = "https://restcountries.com/v3.1/all";
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.length > 0 && isMounted) {
          setCountries(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setErrMsg(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [search]);

  const data = {
    countries: filteredData,
    search,
    setSearch,
    loading,
    errMsg,
    setFilter,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
