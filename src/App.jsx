import React, { useEffect, useState } from 'react';
import Paths from "./path/Paths";
import { API, API_KEY, currentLoc, currentPollution } from './config/api';
import { useMutation } from '@tanstack/react-query';

const App = () => {
  const [weather, setWeather] = useState("");
  const [pollution, setPollution] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [search, setSearch] = useState("");

  const { mutate: mutateL } = useMutation(currentLoc); 
  const { mutate: mutateC } = useMutation(currentPollution); // hash(current loc)


  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#/current-location";
        // Using geolocation in order to get the user's lat & lon 
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
    
              mutateL({latitude, longitude}, {
                onSuccess: (fetchedData) => {
                  const result = fetchedData.data;
                  setWeather(result)
                  window.location.hash = "/current-location";
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
                console.error('Error getting user location:', error);
                window.location.hash = defaultLocation;
            }
        );
    } else {
      console.log(window.location.hash);
      
      // checkHash();
    }
  }, [weather]);

  return (
    <div>
      <Paths search={search} setSearch={setSearch} weather={weather} setWeather={setWeather} forecast={forecast} setForecast={setForecast} pollution={pollution} setPollution={setPollution} />
    </div>
  );
};

export default App;
