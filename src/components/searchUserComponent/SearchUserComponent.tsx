import "./style.scss";

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "react-loader-spinner";
import { RootState } from "../../Store";
import UserListComponent from "../userListComponent/UserListComponent";
import { searchUsersWithName } from "../../actions/UserActions";

const SearchUserComponent = () => {
  const userState = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");

  const handleUserName = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setUserName(value);
  };

  const callSearchUserDispatchAction = () => {
    dispatch(searchUsersWithName(userName));
  };

  const enterKeyPressed = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      callSearchUserDispatchAction();
    }
  };

  return (
    <div className="search__user__component">
      <div
        style={{
          marginTop: 20,
        }}
        className="row"
      >
        <TextField
          id="outlined-basic"
          label="깃허브 유저명"
          onKeyUp={enterKeyPressed}
          onChange={handleUserName}
          value={userName}
          style={{
            width: "70%",
            marginRight: 10,
          }}
          variant="outlined"
        />
        <Button
          onClick={callSearchUserDispatchAction}
          variant="contained"
          color="primary"
        >
          검색하기
        </Button>
      </div>
      {userState.loading ? (
        <div
          style={{
            marginTop: 50,
          }}
        >
          Loading...
        </div>
      ) : (
        <UserListComponent userList={userState.sortedUsers} />
      )}
    </div>
  );
};

export default SearchUserComponent;
