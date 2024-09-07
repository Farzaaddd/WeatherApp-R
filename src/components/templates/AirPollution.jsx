import { useEffect, useState } from "react";
import aqiText from "../../constants/aqiText";

import "./AirPollution.css"
import icons from "../../constants/icons";

const AirPollution = ({pollution}) => {
    const [level, setLevel] = useState("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        
        switch ( pollution && pollution.list[0].main.aqi) {
            case 1:
              setLevel(aqiText[1].level);
              setMessage(aqiText[1].message)
              break;
            
            case 2:
              setLevel(aqiText[2].level);
              setMessage(aqiText[2].message)
              break;

            case 3:
              setLevel(aqiText[3].level);
              setMessage(aqiText[3].message)
              break;

            case 4:
              setLevel(aqiText[4].level);
              setMessage(aqiText[4].message)
              break;

            case 5:
              setLevel(aqiText[5].level);
              setMessage(aqiText[5].message)
              break;

            default:
                null
                break;
        }
    }, [pollution])

    const refreshHandler = () => {
      window.location.reload();
    }
  return (
    <>
        {pollution ?  <div className="air-quality">
        <div className="title">
          <div>
            <h3>Air Quality Index</h3>
          </div>
        </div>

        <div className="status">
          <div>
            <img src={icons[26].path} alt="wind" />
          </div>
        <div className="status-group">
           <div>
            {level}
            <div className="aqi-message">{message}</div>
          </div>    
        </div>

          <div className="badge-desk" onClick={refreshHandler}>
            <small>Refresh</small>
          </div>
        </div>

        <div className="status-forecast">
        <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.co.toPrecision(3)} CO</h5>
            </div>
        
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.nh3.toPrecision(3)} NH3</h5>
            </div>
        
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.no.toPrecision(3)} NO</h5>
            </div>
        
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.no2.toPrecision(3)} NO<sub>2</sub></h5>
            </div>
        
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.o3.toPrecision(3)} O<sub>3</sub></h5>
            </div>
        
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.pm2_5.toPrecision(3)} PM2</h5>
            </div>
                
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.pm10.toPrecision(3)} PM10</h5>
            </div>
                
            <div className="status-forecast-structure">
              <h5>{pollution.list[0].components.so2.toPrecision(3)} SO<sub>2</sub></h5>
            </div>
        </div>
    </div> : null}
    </>
  )
}

export default AirPollution