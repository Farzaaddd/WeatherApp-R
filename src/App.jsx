import { useMutation } from "@tanstack/react-query";
import { airPollution, API, API_KEY, currentLoc, currentPollution, getReload, GetSearch } from "./config/api";
import Paths from "./path/Paths";
import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");

  const { mutate } = useMutation(GetSearch); 
  
  // get weather by reloading
  const { mutate: mutateR } = useMutation(getReload); 

  // get weather by current loc
  const { mutate: mutateL } = useMutation(currentLoc);

  // get air pollution
  const { mutate: mutateA } = useMutation(airPollution);  // by lat & lon
  const { mutate: mutateC } = useMutation(currentPollution); // hash(current loc)


  useEffect(() => {
    // getting the information if we searched a city 

    search && mutate(search, {
      onSuccess: (fetchedData) => {
        const result = fetchedData.data;
        setDisplay(result)
      },
    })

    if (!window.location.hash) {
      window.location.hash = "#/current-location";
    } else {
      checkHash();
    }

  }, [search])

     // current location of user 
     const currentLocation = () => {
      const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

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
    }

    

    // checking the hash and getting the lat & lon 
    const checkHash = function () {
      const requestURL = window.location.hash.slice(1);
      const [route, query] = requestURL.includes
        ? requestURL.split("?")
        : [requestURL];
        
      routes.get(route) ? routes.get(route)(query) : null;
      
      
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
      ["/current-location", currentLocation],
      ["/weather", searchedLocation],
    ]);
  return (
    <div>
      <Paths search={search} setSearch={setSearch}/>
    </div>
  );
};

export default App;
