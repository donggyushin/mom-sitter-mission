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

  const toggleStarred = () => {
    setStarred(!starred);
    if (starred) {
      // 해당 유저가 즐겨찾기에 등록된 유저일때 즐겨찾기에서 제거하는 함수를 호출해야함
      dispatch(removeStarredUser(user, dispatch));
    } else {
      // 해당 유저가 즐겨찾기에 등록되지 않은 유저일때 즐겨찾기에서 추가하는 함수를 호출해야함
      dispatch(addStarredUser(user, dispatch));
    }
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
          onClick={toggleStarred}
          className={"star"}
          src={require("../../assets/star.png")}
        />
      ) : (
        <img
          onClick={toggleStarred}
          className={"star"}
          src={require("../../assets/emptyStar.png")}
        />
      )}
    </div>
  );
};

export default UserCellComponent;
