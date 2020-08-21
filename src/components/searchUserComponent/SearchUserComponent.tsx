import "./style.scss";

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
          label="Outlined"
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
          Search
        </Button>
      </div>
      <UserListComponent userList={userState.sortedUsers} />
    </div>
  );
};

export default SearchUserComponent;
