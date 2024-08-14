import PersonalAccessibility from "../components/templates/PersonalAccessibility"
import SearchBox from "../components/templates/SearchBox"
import SearchMenu from "../components/templates/SearchMenu"

import "./Header.css"
const Header = () => {
  return (
    <header>
        <div className="header-container">
            <SearchMenu/>
            <SearchBox/>
            <PersonalAccessibility/>
        </div>
    </header>
  )
}

export default Header