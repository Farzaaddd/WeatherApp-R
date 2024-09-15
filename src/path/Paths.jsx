import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { airPollutionR, API, API_KEY, currentLoc, currentPollution, getReload } from "../config/api";
import { format } from "date-fns";

import Footer from "../layout/Footer";
import Header from "../layout/Header";

import WeatherResponse from "../components/templates/WeatherResponse";
import calculateLocalTime from "../constants/localTime";
import WeatherTime from "../components/templates/WeatherTime";

import Dubai from "../components/templates/Dubai";
import NewYork from "../components/templates/NewYork";

import Suntime from "../components/templates/Suntime";
import AirPollution from "../components/templates/AirPollution";
import Forecast from "../components/templates/Forecast";

import styles from "./Route.module.css";

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
  const { mutate: mutateA } = useMutation(airPollutionR);  // by lat & lon
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
    
  }, [weather, time, search]);

  
  useEffect(() => {
    const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

    if (window.location.hash == "#/current-location") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          mutateL({latitude, longitude}, {
            onSuccess: (fetchedData) => {
              const result = fetchedData.data;              
              setWeather(result)
            }
          })
  
          // get air pollution by geoLocation 
          mutateC({latitude, longitude}, {
            onSuccess: (fetchedData) => {
              const result = fetchedData.data;
              setPollution(result)
            }
          })

          // get forecast by geoLocation 
          fetch(`${API}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
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
          
        },
        (error) => {
            // display an error if we cant get the users position
            // console.error('Error getting user location:', error);
            window.location.hash = defaultLocation;

            mutateR(window.location.hash.split("?")[1], {
              onSuccess: (fetchedData) => {
                const result = fetchedData.data;
                setWeather(result)
              }
            })

          // get forecast by geoLocation 
          fetch(`${API}/data/2.5/forecast?${window.location.hash.split("?")[1]}&units=metric&appid=${API_KEY}`)
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
        }
      );
    } else {
      mutateR(window.location.hash.split("?")[1], {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setWeather(result)
        }
      })

      // get forecast by geoLocation 
      fetch(`${API}/data/2.5/forecast?${window.location.hash.split("?")[1]}&units=metric&appid=${API_KEY}`)
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
    
      
    mutateA(window.location.hash.split("?")[1], {
      onSuccess: (fetchedData) => {
        const result = fetchedData.data;
        
        setPollution(result)
      }
    })
    }
    
  }, [weather, location])

  return (
    <>
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
  );
};

export default Paths;
