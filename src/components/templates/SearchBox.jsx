import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { GetSearch } from "../../config/api";

import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBox = () => {
    const { mutate, isLoading } = useMutation(GetSearch); 
    const [search, setSearch] = useState("");
    const [display, setDisplay] = useState("");
    

    useEffect(() => {
      mutate(search, {
        onSuccess: (fetchedData) => {
          const result = fetchedData.data;
          setDisplay(result)
        }
      })
    }, [search])

    // console.log(display.lat)
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
                {display.map(loc =>  <li className="view-item">
            <a href={`#/weather?lat=${loc.lat}&lon=${loc.lon}`} className="item-link has-state">
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

          <div className="current-location">
            <LocationOnIcon/>
          </div>
        </div>
    </>
  )
}

export default SearchBox