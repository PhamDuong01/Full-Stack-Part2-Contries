import { useEffect, useState } from "react";
import "./App.css";
import service from "./services/service";
import CountriesList from "./components/CountriesList";

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
        <CountriesList filterCountry={filterCountry} lenght={filterCountry.length} />
      )}
    </div>
  );
}

export default App;
