import { useQuery } from "@tanstack/react-query";
import { newYorkClimate } from "../../config/api";
import icons from "../../constants/icons";
import Loader from "./Loader";

const NewYork = () => {
    const {data, isLoading, isError} = useQuery(["ny-climate"], newYorkClimate) 
  
    if (isLoading) return <Loader/>

    if (isError) return <h4> Something went wrong :( </h4>

  return (
    <>
    <div className="current-loc newY">
        <div className="divided">
        <div className="descriptions">
          <div className="icon-description">
            <img
              src={icons[21].path}
              alt="windy icon"
            />
            <span> Wind </span>
          </div>
  
          <div>&ensp;-</div>
  
          <div className="km-description">
            <span> {Math.round(data.data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
  
        <div className="descriptions">
          <div className="icon-description">
            <img
              src={icons[22].path}
              alt="humidity icon"
            />
            <span> Hum </span>
          </div>
  
          <div>&ensp;-</div>
  
          <div className="km-description">
            <span> {data.data.main.humidity}% <span id="special">//</span></span>
          </div>
        </div>
  
        <div className="descriptions">
          <div className="icon-description">
            <img
              src={icons[23].path}
              alt="feels like icon"
            />
            <span> Feels </span>
          </div>
  
          <div>&ensp;-</div>
  
          <div className="km-description">
            <span> {data.data.main.feels_like.toFixed(
              0
            )}% <span id="special">//</span></span>
          </div>
        </div>
      </div>
  
      <div className="location-name">
        <div className="weather-name">
          <i className="fa fa-map-marker" aria-hidden="true"></i> 
          {data.data.name} / {data.data.sys.country}
        </div>
  
        <div className="weather-degree">{data.data.main.temp.toFixed(
          0
        )}<sup>°</sup></div>
      </div>

    </div>
    
    <div className="current-new-box"></div>

    </>
  )
}

export default NewYork