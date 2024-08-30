import { useState } from "react"
import PersonalAccessibility from "../components/templates/PersonalAccessibility"
import SearchBox from "../components/templates/SearchBox"
import SearchMenu from "../components/templates/SearchMenu"

import "./Header.css"
const Header = ({setWeather, setPollution}) => {
  

  return (
    <header>
        <div className="header-container">
            <SearchMenu/>
            <SearchBox setWeather={setWeather} setPollution={setPollution}/>
            <PersonalAccessibility/>
        </div>
    </header>
  )
}

export default Header