import react, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CountryWeather = (props) => {
  const [countryWather, setCountryWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER}&q=${props.country}&aqi=no`
      )
      .then((res) => setCountryWeather(res.data));
  }, []);

  if (!countryWather) {
    return <></>;
  }
  return (
    <div>
      <h5 className="">
        Temprature:
        <span className="secondcolor">
          {" "}
          {countryWather.current.temp_c} Celcius
        </span>
      </h5>
      <img src={countryWather.current.condition.icon} />
      <h5>
        Wind:
        <span className="secondcolor">
          {" "}
          {countryWather.current.wind_mph}Mph
        </span>{" "}
      </h5>
      <h5>
        Wind Direction:
        <span className="secondcolor">
          {" "}
          {countryWather.current.wind_dir}
        </span>{" "}
      </h5>
    </div>
  );
};
const Country = (props) => {
  console.log(Object.values(props.countries[props.index].languages));
  let languages = Object.values(props.countries[props.index].languages);
  return (
    <div className="row align-items-center justify-content-center">
      <div className=" col-6 border ">
        <img
          style={{ padding: "5%" }}
          width="60%"
          src={props.countries[props.index].coatOfArms.png}
        />
      </div>
      <div className="col-6   maincolr">
        <h4 className="text-left">
          <span>{props.countries[props.index].name.common}</span>
        </h4>
        <h5>
          Capital:
          <span className="secondcolor">
            {props.countries[props.index].capital[props.index]}
          </span>
        </h5>
        <h5>
          Population:
          <span className="secondcolor">
            {props.countries[props.index].population}
          </span>
        </h5>

        <h5 className="">Languages:</h5>
        <div className="col-12" className="maincolr">
          {languages.length > 1
            ? languages.map((x, i) => (
                <li key={i}>
                  <span>
                    <p>{x}</p>
                  </span>
                </li>
              ))
            : languages[0]}
          <h4 className="maincolr">
            Weather in {props.countries[props.index].capital}
          </h4>
          <CountryWeather country={props.countries[props.index].capital} />
        </div>
      </div>
    </div>
  );
};

const CountryDetail = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1); // 0, 1,2..

  const clickHandler = (idx) => {
    setSelectedIndex(selectedIndex === idx ? -1 : idx);
  };

  if (!props.Serchcountry) {
    return <div></div>;
  } else if (props.countries.length === 1) {
    return <Country countries={props.countries} index={0} />;
  } else if (props.countries.length <= 10) {
    return (
      <div className="row">
        <div className="col-md-4 ">
          {props.countries.map((country, i) => (
            <div className="row" key={i}>
              <ul>
                <li>
                  <div className="row">
                    <div className="offset-1 col-7 text-left">
                      <span style={{ marginRight: "10px" }}>
                        {country.name.common}
                      </span>
                    </div>
                    <div className="col-2 text-left ">
                      {" "}
                      <button
                        onClick={() => clickHandler(i)}
                        className={
                          selectedIndex === i
                            ? "btn btn-warning badge"
                            : "btn btn-primary badge"
                        }
                      >
                        {selectedIndex === i ? "Hide" : "show"}
                      </button>
                    </div>
                  </div>
                </li>
                <hr></hr>
              </ul>
            </div>
          ))}
        </div>
        <div className="col-md-7">
          {selectedIndex > -1 && (
            <Country countries={props.countries} index={selectedIndex} />
          )}
        </div>
      </div>
    );
  } else if (props.countries.length > 10) {
    return (
      <div className="text-center text-danger">
        Too many matches specify another filter
      </div>
    );
  }
};

const App = () => {
  const [Serchcountry, setSerchCountry] = useState("");
  const [result, setResult] = useState([]);
  const [allcountry, setAllCountry] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setAllCountry(response.data));
  }, []);
  const onChange = (e) => {
    setSerchCountry(e);

    setResult(
      allcountry.filter((country) =>
        country.name.common.toUpperCase().includes(Serchcountry.toUpperCase())
      )
    );
  };
  console.log(allcountry);
  console.log(result);
  return (
    <div className="container">
      <div className="row justify-content-center alight-items-end">
        <div className="col-md-12  text-center">
          <h3>Country Search</h3>{" "}
          <input
            className=""
            value={Serchcountry}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <CountryDetail countries={result} Serchcountry={Serchcountry} />
        </div>
      </div>
    </div>
  );
};

export default App;

//try to make case insensetive
