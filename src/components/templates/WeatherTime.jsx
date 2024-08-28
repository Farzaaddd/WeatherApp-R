import { useEffect, useState } from "react";
import weekDayNames from "../../constants/weekDays";
import monthNames from "../../constants/monthNames";
import backgrounds from "../../constants/backgrounds";

import styles from "./WeatherTime.module.css";

const WeatherTime = ({checkDay, time, setTime ,greeting}) => {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
    let currentDate = new Date();;

    useEffect(() => {
      const interval = setInterval(() => {

        // Split the time and period (AM/PM)
        const [currentTime, period] = time.split(' ');
  
        // Extract hours, minutes, and seconds
        const [hours, minutes, seconds] = currentTime.split(':').map(Number);
  
        // Calculate new time
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
  
        // Update time string
        const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')} ${period}`;
  
        setTime(newTime);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [time]);


    // getting user's name
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
    }, [username])

  return (
    <nav>
      <div className={styles.weatherTime}>

      <p className={styles.time}> {time && time} </p>

        <p className={styles.date}> {
            weekDayNames[currentDate.getDay()] +
            ", " +
            currentDate.getDate() +
            "" +
            monthNames[currentDate.getMonth()] +
            " " +
            currentDate.getFullYear()
        } </p>
          
        <p className={styles.name}>
            <img src={checkDay === "day" ? backgrounds[14].path : backgrounds[15].path} alt="image" />
          
            <span>
                &nbsp;
                {greeting}
                <span className={styles.username}> {username} </span>
            </span>
        </p>
        
      </div>
    </nav>
  )
}

export default WeatherTime