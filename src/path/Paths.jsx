import { useEffect, useState } from "react";
import WeatherResponse from "../components/templates/WeatherResponse";
import Header from "../layout/Header";
import calculateLocalTime from "../constants/localTime";
import WeatherTime from "../components/templates/WeatherTime";
import Dubai from "../components/templates/Dubai";
import NewYork from "../components/templates/NewYork";
import Suntime from "../components/templates/Suntime";
import AirPollution from "../components/templates/AirPollution";
import Forecast from "../components/templates/Forecast";
import Footer from "../layout/Footer";
import styles from "./Route.module.css";
import { useMutation } from "@tanstack/react-query";
import { airPollution, API, API_KEY, currentLoc, currentPollution, getReload } from "../config/api";
import { format } from "date-fns";

const Paths = ({search, setSearch}) => {
  const [weather, setWeather] = useState("");
  const [checkDay, setCheckDay] = useState("");
  const [time, setTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [pollution, setPollution] = useState(null);
  const [forecast, setForecast] = useState(null);

  const windowSize = window.innerWidth;

  // get weather by reloading
  const { mutate: mutateR } = useMutation(getReload); 
  
  // get air pollution
  const { mutate: mutateA } = useMutation(airPollution);  // by lat & lon
  const { mutate: mutateC } = useMutation(currentPollution); // hash(current loc)
 
  // get weather by current loc
  const { mutate: mutateL } = useMutation(currentLoc); 


  useEffect(() => {
    const cityTimezoneOffset = weather.timezone;
    const localTime = calculateLocalTime(cityTimezoneOffset);
    let hour = localTime.getHours();
    let localSharing = localTime.toLocaleTimeString();
    setTime(localSharing);

    if (hour >= 5 && hour < 20) {
      setGreeting("Have a good day,");
      setCheckDay("day");
    } else {
      setGreeting("Have a good night,");
      setCheckDay("night");
    }

    // console.log({weather, time, search});
    
  }, [weather, time, search]);

  return (
    <>
      {/* {weather && 
      <> */}
      <Header search={search} setSearch={setSearch} setWeather={setWeather} setPollution={setPollution} setForecast={setForecast} />
      <div className={styles.display}>
        <div style={{ zIndex: 1 }}>
          <WeatherResponse weather={weather} checkDay={checkDay} />
          {windowSize < 1199 && (
            <>
              <Suntime data={weather} />
              <div className={styles.timezoneAir}>
                <WeatherTime time={time} setTime={setTime} checkDay={checkDay} greeting={greeting} />
                <AirPollution pollution={pollution} />
              </div>
            </>
          )}
          {windowSize >= 1200 && (
            <>
              <Dubai />
              <NewYork />
            </>
          )}
        </div>
        {windowSize >= 1200 && (
          <div className={styles.sunAir}>
            <div className={styles.sunAirW}>
              <div>
                <Suntime data={weather} />
              </div>
              <div className={styles.timezoneAir}>
                <WeatherTime time={time} setTime={setTime} checkDay={checkDay} greeting={greeting} />
                <AirPollution pollution={pollution} />
              </div>
            </div>
            <div>
              <Forecast forecast={forecast} />
            </div>
          </div>
        )}
      </div>
      {windowSize <= 1199 && (
        <div style={{ width: "450px", margin: "0 auto" }}>
          <Forecast forecast={forecast} />
        </div>
      )}
      <Footer />
      </>
    // }
    // </>
  );
};

export default Paths;
