import "./WeatherResponse.css"
import {backgroundOpt, wIcon} from "../../helper/helper";
import icons from "../../constants/icons";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Loader from "./Loader";

const WeatherResponse = ({weather, checkDay}) => {
  
  return (
    <>
      {weather ? <>
        <div className="weather-response" style={{backgroundImage: backgroundOpt(weather.weather[0].main, checkDay), color: checkDay === "night" ? "#fff" : "#000"}}>
        <div className="header-weather">
          <div className="name-weather">
            <LocationOnIcon/>
            {weather.name} / {weather.sys.country}
          </div>
          <div className="header-icon">
            <div className="circle" style={{backgroundImage: wIcon(weather.weather[0].icon)}}></div>
            <div className="circle-child2"></div>
          </div>
        </div>
  
        <div className="body-weather">
        <div className="weather-degree">{weather.main.temp.toFixed(
          0
        )}<sup>°</sup></div>
        <div className="weather-description">{weather.weather[0].description}</div>
        <div className="descriptions">
          <div className="icon-description">
          <img
          src={icons[0].path}
          alt="windy icon"
        />
            <span> Wind </span>
          </div>
  
          <div className="line-description"></div>
  
          <div className="km-description">
            <span> {Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
  
        <div className="descriptions">
          <div className="icon-description">
            <img
              src={icons[1].path}
              alt="humidity icon"
            />
            <span> Hum </span>
          </div>
  
          <div className="line-description"></div>
  
          <div className="km-description">
            <span> {weather.main.humidity}% <span id="special">//</span></span>
          </div>
        </div>
  
        <div className="descriptions">
          <div className="icon-description">
            <img
              src={icons[2].path}
              alt="feels icon"
            />
            <span> Feels </span>
          </div>
  
          <div className="line-description"></div>
  
          <div className="km-description">
            <span> {weather.main.feels_like.toFixed(
              0
            )}% <span id="special">//</span></span>
          </div>
        </div>
      </div>
        </div>
      </> : <Loader/>}
    </>
  )
}

export default WeatherResponse