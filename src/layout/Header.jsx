import { useState } from "react"
import PersonalAccessibility from "../components/templates/PersonalAccessibility"
import SearchBox from "../components/templates/SearchBox"

import "./Header.css"
const Header = ({setWeather, setPollution, setForecast}) => {
  

  return (
    <header>
        <div className="header-container">
            {/* <SearchMenu/> */}
            <SearchBox setWeather={setWeather} setPollution={setPollution} setForecast={setForecast}/>
            <PersonalAccessibility/>
        </div>
    </header>
  )
}

export default Header