import "./style.scss";

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Store";
import UserListComponent from "../userListComponent/UserListComponent";
import { searchingStarredUser } from "../../actions/StarredUserActions";

const StarredUserComponent = () => {
  const starredUserState = useSelector(
    (state: RootState) => state.StarredUserReducer
  );

  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const handleUserName = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setUserName(value);
  };

  const callSearchingStarredUsers = () => {
    dispatch(searchingStarredUser(userName));
  };

  const enterPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      callSearchingStarredUsers();
    }
  };

  return (
    <div className="starred__user__component">
      <div
        style={{
          marginTop: 20,
        }}
        className="row"
      >
        <TextField
          id="outlined-basic"
          label="유저이름"
          onKeyUp={enterPressed}
          onChange={handleUserName}
          value={userName}
          style={{
            width: "70%",
            marginRight: 10,
          }}
          variant="outlined"
        />
        <Button
          onClick={callSearchingStarredUsers}
          variant="contained"
          color="primary"
        >
          {userName.length === 0 ? "모든유저" : "검색"}
        </Button>
      </div>
      {/* 
      기본적으로는 즐겨찾기에 등록된 모든 유저들을 보여줍니다. 
      하지만 검색모드일 경우에는 검색 조건에 해당하는 유저들만을 보여줍니다. 
      */}
      {starredUserState.searchMode ? (
        <UserListComponent userList={starredUserState.searchedUsers} />
      ) : (
        <UserListComponent userList={starredUserState.users} />
      )}
    </div>
  );
};

export default StarredUserComponent;
