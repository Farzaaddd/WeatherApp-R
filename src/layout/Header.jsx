import PersonalAccessibility from "../components/templates/PersonalAccessibility"
import SearchBox from "../components/templates/SearchBox"

import "./Header.css"
const Header = ({search, setSearch, setWeather, setPollution, setForecast}) => {

  return (
    <header>
        <div className="header-container">
            <SearchBox search={search} setSearch={setSearch} setWeather={setWeather} setPollution={setPollution} setForecast={setForecast}/>
            <PersonalAccessibility/>
        </div>
    </header>
  )
}

export default Header