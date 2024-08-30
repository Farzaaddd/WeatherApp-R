import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { airPollution, currentLoc, currentPollution, getReload, GetSearch, getWeather, Pollution } from "../../config/api";

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBox = ({setWeather, setPollution}) => {
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

    const [search, setSearch] = useState("");
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
      
      mutateW(location, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setWeather(result)
        }
      })

      mutateP(location, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setPollution(result)
        }
      })
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

          mutateC({latitude, longitude}, {
            onSuccess: (fetchedData) => {
              const result = fetchedData.data;
              setPollution(result)
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
    

    // checking the hash and getting the lat & lon 
    const checkHash = function () {
      const requestURL = window.location.hash.slice(1);
      const [route, query] = requestURL.includes
        ? requestURL.split("?")
        : [requestURL];
        
      routes.get(route) ? routes.get(route)(query) : null;
      
      mutateA({query}, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setPollution(result)
        }
      })
      
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