
import "./Forecast.css";

const Forecast = ({forecast}) => {

  return (
    <div className="forecast">
      {forecast && forecast.map((data, index) => (
        <div className="day" key={index}>
          <div className="img">
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}.png`}
              alt="Weather Icon"
            />
          </div>
          <div className="day-description">
            <div className="day-name">{data.date}</div>
            <div className="day-hour">{data.hour}</div>
            <div className="degree">{data.temperature}<sup>°</sup></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forecast