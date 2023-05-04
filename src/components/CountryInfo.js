const CountryInfo = (props) => {
  const countries = props.data;
  let languages = [];

  for (const key in countries.languages) {
    const value = countries.languages[key];
    languages.push(`${value}`);
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
    </div>
  );
};

export default CountryInfo;
