import { useEffect, useState } from "react";
import weekDayNames from "../../constants/weekDays";
import monthNames from "../../constants/monthNames";
import backgrounds from "../../constants/backgrounds";

import styles from "./WeatherTime.module.css";

const WeatherTime = ({ checkDay, time, setTime, greeting }) => {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  let currentDate = new Date();

  useEffect(() => {
    if (!time) return;

    const interval = setInterval(() => {
      const [currentTime, period] = time.split(' ');
      const [hours, minutes, seconds] = currentTime.split(':').map(Number);

      let newSeconds = seconds + 1;
      let newMinutes = minutes;
      let newHours = hours;

      if (newSeconds === 60) {
        newSeconds = 0;
        newMinutes += 1;
      }

      if (newMinutes === 60) {
        newMinutes = 0;
        newHours += 1;
      }

      if (newHours === 12 && period === "AM") {
        newHours = 0;
      }

      if (newHours === 12 && period === "PM") {
        newHours = 12;
      }

      const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')} ${period}`;

      setTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, setTime]);

  useEffect(() => {
    if (!username) {
      setTimeout(() => {
        const userInput = prompt("May I have your name please?");
        if (userInput == null || userInput.trim() === "") {
          setUsername("Dear!");
          localStorage.setItem("username", "Dear!");
        } else {
          setUsername(userInput);
          localStorage.setItem("username", userInput);
        }
      }, 7000);
    }
  }, [username]);

  return (
    <nav>
      <div className={styles.weatherTime}>
        <p className={styles.time}>{time}</p>
        <p className={styles.date}>
          {weekDayNames[currentDate.getDay()] +
            ", " +
            currentDate.getDate() +
            " " +
            monthNames[currentDate.getMonth()] +
            " " +
            currentDate.getFullYear()}
        </p>

        <p className={styles.name}>
          <img src={checkDay === "day" ? backgrounds[14].path : backgrounds[15].path} alt="image" />
          <span>
            &nbsp;
            {greeting}
            <span className={styles.username}> {username}</span>
          </span>
        </p>
      </div>
    </nav>
  );
};

export default WeatherTime;