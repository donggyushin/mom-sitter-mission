import "./style.scss";

import { COLORS } from "../../constants/Constants";
import { LocationType } from "../../types/Types";
import React from "react";

interface Props {
  currentLocation: LocationType;
  switchToSearch: () => void;
  switchToStarred: () => void;
}

const TabNavigationComponent: React.FunctionComponent<Props> = ({
  currentLocation,
  switchToSearch,
  switchToStarred,
}) => {
  return (
    <div className="tab__navigation__component">
      <div
        onClick={switchToSearch}
        className={`button ${currentLocation === "search" && "selected"}`}
        style={{
          borderRight: `1px solid ${COLORS.gray}`,
        }}
      >
        검색
      </div>
      <div
        onClick={switchToStarred}
        className={`button ${currentLocation === "starred" && "selected"}`}
      >
        즐겨찾기
      </div>
    </div>
  );
};

export default TabNavigationComponent;
