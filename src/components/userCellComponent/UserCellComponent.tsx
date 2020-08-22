import "./style.scss";

import React, { useEffect, useState } from "react";
import {
  addStarredUser,
  removeStarredUser,
} from "../../actions/StarredUserActions";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Store";
import { UserType } from "../../actions/UserActionTypes";

interface Props {
  user: UserType;
}

const UserCellComponent: React.FunctionComponent<Props> = ({ user }) => {
  const starredUserState = useSelector(
    (state: RootState) => state.StarredUserReducer
  );

  const dispatch = useDispatch();

  const [starred, setStarred] = useState(false);

  useEffect(() => {
    checkStarred();
  });

  const stareTrue = () => {
    setStarred(true);
    dispatch(addStarredUser(user, dispatch));
  };

  const stareFalse = () => {
    setStarred(false);

    dispatch(removeStarredUser(user, dispatch));
  };

  const checkStarred = () => {
    starredUserState.users.map((starredUser) => {
      if (starredUser.node_id === user.node_id) {
        setStarred(true);
      }
    });
  };

  return (
    <div className={"user__cell__container"}>
      <img src={user.avatar_url} />
      <div>{user.login}</div>
      {starred ? (
        <img
          onClick={stareFalse}
          className={"star"}
          src={require("../../assets/star.png")}
        />
      ) : (
        <img
          onClick={stareTrue}
          className={"star"}
          src={require("../../assets/emptyStar.png")}
        />
      )}
    </div>
  );
};

export default UserCellComponent;
