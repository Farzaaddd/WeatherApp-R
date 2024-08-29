import React, { useState, useEffect } from 'react';
import SunCalc from 'suncalc';

import icons from "../../constants/icons";
import { cities, sunTime } from "../../constants/Suntime";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import "./Suntime.css"


const Suntime = ({data: {name, sys}}) => {
    const [sunTimes, setSunTimes] = useState([]);

  useEffect(() => {

    const date = new Date();
    const times = cities.map(city => {
      const sunTimes = SunCalc.getTimes(date, city.latitude, city.longitude);

      const sunrise = sunTimes.sunrise;
      const sunset = sunTimes.sunset;

      const formattedSunrise = `${sunrise.getHours()}:${sunrise.getMinutes()}AM`;
      const formattedSunset = `${sunset.getHours()}:${sunset.getMinutes()}PM`;

      return {
        city: city.name,
        sunrise: city.name === "Dubai" || city.name === "Tehran" ? formattedSunrise : `${sunrise.getHours() - 8}:${sunrise.getMinutes()}AM`,
        sunset: city.name === "Dubai" || city.name === "Tehran" ? formattedSunset : `${sunset.getHours() + 4}:${sunset.getMinutes()}PM`,
      };
    });

    setSunTimes(times);
    
  }, []);

  return (
    <div className="suntime">
      <h2>Sunrise & Sunset</h2>
      <div className="custom-background">
      <div className="suntime-name">
          <div className="city-name">
            <div>
              <LocationOnIcon/>
              <span>{name}</span>
            </div>
          </div>
        </div>
  
        <div className="suntime-time">
          <div className="sunrise">
            <div>
              <img
                src={icons[24].path}
                alt="sunrise"
              />
            </div>
  
            <div>
              <p>Sunrise</p>
              <p className="sunrise-x">
                {sys && sunTime(sys).sunriseX}
              </p>
            </div>
          </div>
  
          <div className="sunset">
            <div>
              <img
                src={icons[25].path}
                alt="sunset"
              />
            </div>
            <div>
              <p>Sunset</p>
              <p className="sunset-x">
              {sys && sunTime(sys).sunsetX}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2>Highlight cities</h2>
      <div className="highlight-cities">
          {sunTimes.map((time, index) => (
          <div key={index} className="cities">
            <div className="city-name">
              <h3>
                <LocationOnIcon/>
                {time.city}
              </h3>
            </div>
              <div className="city-sunrise">
                <p>
                  <LightModeOutlinedIcon/>
                  <span className="sunrise-hl">{time.sunrise}</span>
                </p>
              </div>

              <div className="city-sunset">
                <p>
                  <DarkModeOutlinedIcon/>
                  <span className="sunset-hl">{time.sunset}</span>
                </p>
              </div>
          </div>
            ))}
      </div>

    </div>
  )
}

export default Suntime