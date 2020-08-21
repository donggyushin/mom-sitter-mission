import "./style.scss";

import React, { useState } from "react";

import { LocationType } from "./types/Types";
import SearchUserComponent from "./components/searchUserComponent/SearchUserComponent";
import StarredUserComponent from "./components/starredUsersComponent/StarredUserComponent";
import TabNavigationComponent from "./components/tabNavigation/TabNavigation";

function App() {
  const [currentLocation, setCurrentLocation] = useState<LocationType>(
    "search"
  );

  const switchToSearchComponent = () => {
    setCurrentLocation("search");
  };

  const switchToStarredComponent = () => {
    setCurrentLocation("starred");
  };

  return (
    <div className="app">
      {currentLocation === "search" ? (
        <SearchUserComponent />
      ) : (
        <StarredUserComponent />
      )}
      <TabNavigationComponent
        switchToSearch={switchToSearchComponent}
        switchToStarred={switchToStarredComponent}
        currentLocation={currentLocation}
      />
    </div>
  );
}

export default App;
