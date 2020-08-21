import "./style.scss";

import React, { useEffect, useState } from "react";

import { LocationType } from "./types/Types";
import SearchUserComponent from "./components/searchUserComponent/SearchUserComponent";
import StarredUserComponent from "./components/starredUsersComponent/StarredUserComponent";
import TabNavigationComponent from "./components/tabNavigation/TabNavigation";
import { fetchingStarredUsers } from "./actions/StarredUserActions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState<LocationType>(
    "search"
  );

  useEffect(() => {
    callFetchingStarredUsers();
  }, []);

  const callFetchingStarredUsers = () => {
    dispatch(fetchingStarredUsers());
  };

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
