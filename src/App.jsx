import React, { useState } from 'react';
import Paths from "./path/Paths";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Paths search={search} setSearch={setSearch}/>
    </div>
  );
};

export default App;
