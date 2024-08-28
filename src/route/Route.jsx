import { useEffect, useState } from "react";
import WeatherResponse from "../components/templates/WeatherResponse"
import Header from "../layout/Header"
import calculateLocalTime from "../constants/localTime";
import WeatherTime from "../components/templates/WeatherTime";

import styles from "./Route.module.css";
import Dubai from "../components/templates/Dubai";
import NewYork from "../components/templates/NewYork";

const Route = () => {
  const [weather, setWeather] = useState("");
  const [checkDay, setCheckDay] = useState("");
  const [time, setTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  

  useEffect(() => {
    const cityTimezoneOffset = weather.timezone; // Example timezone offset for New York City (in seconds, here -14400 represents UTC-4)
    const localTime = calculateLocalTime(cityTimezoneOffset);
    let hour = localTime.getHours();
    let localSharing = localTime.toLocaleTimeString();
    setTime(localSharing)

    console.log(greeting);

    if (hour >= 5 && hour < 12) {
      setGreeting("Have a good day,");
      setCheckDay("day")
    } else if (hour >= 12 && hour < 20) {
      setGreeting("Have a good day,");
      setCheckDay("day")
    } else {
      setGreeting("Have a good night,");
      setCheckDay("night")
    }
    
    // let greeting;
  }, [weather])

  return (
    <>
      <Header setWeather={setWeather}/>
      <div className={styles.display}>
        <div>
          <WeatherResponse weather={weather} checkDay={checkDay}/>
          <Dubai/>
          <NewYork/>
        </div>

        <div>
          <WeatherTime time={time} setTime={setTime} checkDay={checkDay} greeting={greeting}/>
        </div>
      </div>
    </>
  )
}

export default Route