import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { currentLoc, GetSearch, getWeather } from "../../config/api";

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBox = () => {
  const { mutate, isLoading } = useMutation(GetSearch); 
  const { mutate: mutateW, isLoading: isLoading2 } = useMutation(getWeather); 
  const { mutate: mutateL, isLoading: isLoading3 } = useMutation(currentLoc); 

    const [search, setSearch] = useState("");
    const [display, setDisplay] = useState("");
    const [weather, setWeather] = useState("");
    

    useEffect(() => {
      mutate(search, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setDisplay(result)
        }
      })

      if (!window.location.hash) {
        window.location.hash = "#/current-location";
      } else {
        checkHash();
      }
      
      console.log(weather);
    }, [search])

    const weatherHandler = (lat, lon) => {
      const location = {lat, lon}
      
      mutateW(location, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setWeather(result)
        }
      })
    }

    const currentLocation = () => {
      const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);

          mutateL({latitude, longitude}, {
            onSuccess: (fetchedData) => {
              const result = fetchedData.data;
              setWeather(result)
              console.log(result);
            }
          })
        },
        (error) => {
            // display an error if we cant get the users position
            console.error('Error getting user location:', error);
            window.location.hash = defaultLocation;
        }
    );
    }
    console.log(display)
    console.log(weather)
    

    const checkHash = function () {
      const requestURL = window.location.hash.slice(1);
      const [route, query] = requestURL.includes
        ? requestURL.split("?")
        : [requestURL];
        
      routes.get(route) ? routes.get(route)(query) : null;
    };
  
    const searchedLocation = (query) => {
      weatherHandler(...query.split("&"));
    };

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
                {display.map(loc =>  <li className="view-item" key={loc.lat}>
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