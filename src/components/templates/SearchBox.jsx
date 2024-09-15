import { useEffect, useState } from "react"

import { useMutation } from "@tanstack/react-query";

import { airPollution, API, API_KEY, currentLoc, currentPollution, getReload, GetSearch, getWeather, Pollution } from "../../config/api";

import { format } from 'date-fns';

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBox = ({search, setSearch, setWeather, setPollution, setForecast}) => {
  // get weather by search 
  const { mutate } = useMutation(GetSearch); 

  // get weather by lat & lon 
  const { mutate: mutateW } = useMutation(getWeather); 

  // get weather by current loc
  const { mutate: mutateL } = useMutation(currentLoc); 

  // get weather by reloading
  const { mutate: mutateR } = useMutation(getReload); 

  // get air pollution
  const { mutate: mutateA } = useMutation(airPollution);  // by lat & lon
  const { mutate: mutateP } = useMutation(Pollution);  // search
  const { mutate: mutateC } = useMutation(currentPollution); // hash(current loc)

  // get forecast 

    // const [search, setSearch] = useState("");
    const [display, setDisplay] = useState("");
    

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

    // searching for each city 
    const weatherHandler = (lat, lon) => {
      const location = {lat, lon}
      
      // get weather by lat & lon 👇
      mutateW(location, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setWeather(result)
        }
      })

      // get air pollution by search 👇
      mutateP(location, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setPollution(result)
        }
      })

      // get forecast by search
    fetch(`${API}/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`)
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
      query && mutateA({query}, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setPollution(result)
        }
      })

      // get forecast by query 
    query && fetch(`${API}/data/2.5/forecast?${query}&units=metric&appid=${API_KEY}`)
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
    <>
        <div className="search-form">
          <div className="search-icon">
            <SearchIcon/>
          </div>
          <div className="search-input">
            <input
              type="search"
              name="search-city"
              id="search-city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city . . ."
            />
            <div className="search-result">
            {display ? <ul className="view-list active">
                {display.map(loc =>  <li className="view-item" >
            <a href={`#/weather?lat=${loc.lat}&lon=${loc.lon}`} className="item-link has-state" onClick={() => weatherHandler(loc.lat, loc.lon)}>
          <div className="view-items">
            <div>
              <LocationOnIcon/>
            </div>  
  
            <div className="city-des">
            <p className="item-title">{loc.name}</p>
            <p className="lable-2 item-subtitle">{loc.state || ""} {loc.country}</p>
            </div>
            
            </div>
            </a>
            </li>)}
            </ul> : null}
            </div>
          </div>

          <div className="current-location" onClick={currentLocation}>
            <LocationOnIcon/>
          </div>
        </div>
    </>
  )
}

export default SearchBox