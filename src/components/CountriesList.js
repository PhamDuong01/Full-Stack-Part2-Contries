import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";

function CountriesList(props) {
  const countries = props.filterCountry;
  const [showCountry, setShowCountry] = useState("");
  const [myCountry, setMyCountry] = useState({});

  function handleShowCountry(e) {
    e.target.dataset.value !== showCountry
      ? setShowCountry(e.target.dataset.value)
      : setShowCountry("");
    setMyCountry(countries[Number(e.target.dataset.value)]);
  }

  if (props.lenght > 10) return <p>Too many matches, specify another filter</p>;
  if (props.lenght > 1) {
    return (
      <div>
        {countries.map((country, index) => {
          return (
            <div key={index}>
              <div key={country.name.official}>
                <span>{country.name.common}</span>{" "}
                <button data-value={index} onClick={handleShowCountry}>
                  {showCountry === index.toString() ? "hide" : "show"}
                </button>
                {showCountry === index.toString() && <CountryInfo data={myCountry} />}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (props.lenght === 1) {
    return <CountryInfo data={countries[0]} />;
  }
  return;
}

export default CountriesList;
