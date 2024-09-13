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
import { airPollution, API, API_KEY, currentLoc, getReload } from "../config/api";
import { format } from "date-fns";

const Paths = ({search, setSearch}) => {
  const [weather, setWeather] = useState("");
  const [checkDay, setCheckDay] = useState("");
  const [time, setTime] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [pollution, setPollution] = useState(null);
  const [forecast, setForecast] = useState(null);

  const windowSize = window.innerWidth;

  const { mutate } = useMutation(currentLoc); 
  const { mutate: mutateR } = useMutation(getReload); 
  const { mutate: mutateA } = useMutation(airPollution);  // by lat & lon


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

  // useEffect(() => {
  //   const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       if(window.location.hash == "#/current-location"){
  //         // console.log({latitude, longitude});
  //         mutate({latitude, longitude}, {
  //           onSuccess: (fetchedData) => {
  //             const result = fetchedData.data;
  //             setWeather(result)
  //           }
  //         })
  //       }else if(window.location.hash == "#/weather?lat=51.5073219&lon=-0.1276474"){
  //        checkHash()
  //       }
        
  //     },
  //     (error) => {
  //         // display an error if we cant get the users position
  //         console.error('Error getting user location:', error);
  //         window.location.hash = defaultLocation;
  //     }
  // );
  // }, [])

      // checking the hash and getting the lat & lon 
    const checkHash = function () {
      const requestURL = window.location.hash.slice(1);
      const [route, query] = requestURL.includes
        ? requestURL.split("?")
        : [requestURL];
        
      routes.get(route) ? routes.get(route)(query) : null;
      console.log(query);
      
      
      // get air pollution by query 
      mutateA({query}, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setPollution(result)
        }
      })

      // get forecast by query 
    fetch(`${API}/data/2.5/forecast?${query}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const dailyForecasts = data.list.map((forecast) => {
          const date = forecast.dt_txt.split(" ")[1];
          const estimate = date.slice(0, 2);
          const estimated = estimate >= 12 ? "PM" : "AM";

          // Use `date-fns` to format the date
          const formattedDate = format(new Date(forecast.dt * 1000), 'EEE');

          return {
            date: formattedDate,
            hour: `${estimate}:00 ${estimated}`,
            temperature: forecast.main.temp.toFixed(0),
            icon: forecast.weather[0].icon,
          };
        });

        setForecast(dailyForecasts);
      })
      .catch((error) => console.error("Error fetching the forecast data:", error));
    };
  
    // Getting the location that searched 
    const searchedLocation = (query) => {
      mutateR(query, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setWeather(result)
        }
      })
    };

    // getting routes 
    const routes = new Map([
      ["/weather", searchedLocation],
    ]);
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
