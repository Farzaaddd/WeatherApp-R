import React, { useEffect } from 'react';
import Paths from "./path/Paths";

const App = () => {
  useEffect(() => {
    // Check if the page has already been refreshed
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // If not refreshed before, set it in local storage and reload the page
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <Paths />
    </div>
  );
};

export default App;
