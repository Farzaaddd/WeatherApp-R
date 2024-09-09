import { useState } from "react";
import Paths from "./path/Paths";

const App = () => {
  const [weather, setWeather] = useState("");

  return (
    <div>
      <Paths weather={weather} setWeather={setWeather}/>
    </div>
  );
};

export default App;
