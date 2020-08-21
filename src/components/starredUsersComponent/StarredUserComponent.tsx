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
          onClick={callSearchingStarredUsers}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
      {starredUserState.searchMode ? (
        <UserListComponent userList={starredUserState.searchedUsers} />
      ) : (
        <UserListComponent userList={starredUserState.users} />
      )}
    </div>
  );
};

export default StarredUserComponent;
