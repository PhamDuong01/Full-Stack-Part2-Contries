import { useEffect, useState } from "react";
import "./App.css";
import service from "./services/service";

const Information = (props) => {
  const countries = props.filterCountry;
  if (props.lenght > 10) return <p>Too many matches, specify another filter</p>;
  if (props.lenght > 1) {
    return (
      <div>
        {countries.map((country) => {
          return <p key={country.name.official}>{country.name.common}</p>;
        })}
      </div>
    );
  }
  if (props.lenght === 1) {
    let languages = [];
    for (const key in countries[0].languages) {
      const value = countries[0].languages[key];
      languages.push(`${value}`);
    }
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        {countries[0].capital.map((capital) => {
          return <p key={capital}>{capital}</p>;
        })}
        <p>area {countries[0].area}</p>
        <ul>
          <h4>Languages:</h4>
          {languages.map((language) => {
            return <li key={language}>{language}</li>;
          })}
        </ul>
        <div className="flag">
          <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        </div>
      </div>
    );
  }
  return;
};

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [listCountry, setListCountry] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);

  useEffect(() => {
    getAllCountry();
  }, []);

  async function handleSearchCountry(e) {
    setSearchCountry(e.target.value);
    const result = await listCountry.filter((country) => {
      return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterCountry(result);
  }

  async function getAllCountry() {
    const data = await service.getAll();

    setListCountry(
      data.map((country) => {
        return country;
      })
    );
  }

  return (
    <div className="App">
      <div>
        find countries <input type="text" onChange={handleSearchCountry} value={searchCountry} />
      </div>
      {searchCountry !== "" && (
        <Information filterCountry={filterCountry} lenght={filterCountry.length} />
      )}
    </div>
  );
}

export default App;
