import axios from "axios";
import { useEffect, useState } from "react";

const CountryInfo = (props) => {
  const countries = props.data;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState({ temperature: "", windSpeed: "", iconWeather: "" });
  let languages = [];

  for (const key in countries.languages) {
    const value = countries.languages[key];
    languages.push(`${value}`);
  }
  useEffect(() => {
    getWeatherData();
  }, []);
  async function getWeatherData() {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countries.latlng[0]}&lon=${countries.latlng[1]}&appid=${apiKey}`
      )
      .then((res) => {
        const weather = {
          temperature: (res.data.main.temp - 273).toFixed(2),
          windSpeed: res.data.wind.speed,
          iconWeather: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        };
        setWeather(weather);
      });
  }

  return (
    <div>
      <h1>{countries.name.common}</h1>
      {countries.capital.map((capital) => {
        return <p key={capital}>capital {capital}</p>;
      })}
      <p>area {countries.area}</p>
      <ul>
        <h4>Languages:</h4>
        {languages.map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <div className="flag">
        <img src={countries.flags.png} alt={countries.flags.alt} />
      </div>
      <h2>Weather in {countries.capital[0]} </h2>
      <p>Temperature - {weather.temperature} Celcus</p>
      <div>
        <img src={weather.iconWeather} alt="Weather Icon" />
      </div>
      <p>wind {weather.windSpeed} m/s</p>
    </div>
  );
};

export default CountryInfo;
