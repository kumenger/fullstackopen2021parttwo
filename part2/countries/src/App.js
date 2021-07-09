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

  console.log(countryWather);
  if (!countryWather) {
    return <></>;
  }
  return (
    <div>
      <h5 className=''>Temprature:<span className='secondcolor'> {countryWather.current.temp_c} Celcius</span></h5>
      <img src={countryWather.current.condition.icon} />
      <h5>Wind:<span className='secondcolor'> {countryWather.current.wind_mph}Mph</span> </h5>
      <h5>Wind Direction:<span className='secondcolor'> {countryWather.current.wind_dir}</span>  </h5>
    </div>
  );
};
const Country = (props) => {
  return (
    props.countries && (
      <div className='row'>
       <div className='col-12 text-center maincolr'><h5><span>{props.countries[props.index].name}</span></h5></div> 
        <h5>Capital:<span className='secondcolor'>{props.countries[props.index].capital}</span></h5>
        <h5>Population:<span className='secondcolor'>{props.countries[props.index].population}</span></h5>
        
         <h5 className=''>Languages:</h5> <div className='col-12'>
          {props.countries[props.index].languages.length > 1
            ? props.countries[props.index].languages.map((x, i) => (
                <li key={i}><span  className='secondcolor'>{x.name}</span></li>
              ))
            : props.countries[props.index].languages[0].name}
        
        </div>
        <div className='col-12'><img style={{padding:"5%"}} width="40%" src={props.countries[props.index].flag} /></div>
        <h5 className='text-center maincolr'>Weather in {props.countries[props.index].capital}</h5>
        <CountryWeather country={props.countries[props.index].capital} />
      </div>
    )
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
        <div className="col-5 ">
          {props.countries.map((country, i) => (
            <div className='row'>
            <ul>
              <li key={i}>
                <div className='row'>
                 <div className='offset-1 col-7 text-left'><span style={{marginRight: "10px"}}>{country.name}</span></div> 
                <div className='col-2 '>  <button
                    onClick={() => clickHandler(i)}
                    className={
                      selectedIndex === i
                        ? "btn btn-warning badge"
                        : "btn btn-primary badge"
                    }
                  >
                    {selectedIndex === i ? "Hide" : "show"}
                  </button></div>
                  
                </div>
              </li>
            </ul>
            </div>
          ))}
        </div>
        <div className="col-7">
          {selectedIndex > -1 && (
            <Country countries={props.countries} index={selectedIndex} />
          )}
        </div>
      </div>
    );
  } else if (props.countries.length > 10) {
    return <div>Too many matches specify another filter</div>;
  }
};

const App = () => {
  const [Serchcountry, setSerchCountry] = useState("");
  const [result, setResult] = useState([]);
  const [allcountry, setAllCountry] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setAllCountry(response.data));
  }, []);
  const onChange = (e) => {
    setSerchCountry(e.target.value);

    setTimeout(() => {
      setResult(
        allcountry.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }, 1000);
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <div className="row">
        <div className="col-12 input-group">
          <span className="input-group-text text-info bg-dark " style={{fontFamily:"cursive"}}>Search Country</span>
          <input
            className="form-control"
            value={Serchcountry}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row ">
        <div className="col-12">
          <CountryDetail countries={result} Serchcountry={Serchcountry} />
        </div>
      </div>
    </div>
  );
};

export default App;

//try to make case insensetive
