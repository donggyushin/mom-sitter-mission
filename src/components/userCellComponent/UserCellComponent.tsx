import "./style.scss";

import React from "react";
import { UserType } from "../../actions/UserActionTypes";

interface Props {
  user: UserType;
}

const UserCellComponent: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={"user__cell__container"}>
      <img src={user.avatar_url} />
      <div>{user.login}</div>
    </div>
  );
};

export default UserCellComponent;
