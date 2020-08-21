import "./style.scss";

import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderSpellingComponent from "../headerSpellingComponent/HeaderSpellingComponent";
import { RootState } from "../../Store";
import UserCellComponent from "../userCellComponent/UserCellComponent";
import { searchUsersWithName } from "../../actions/UserActions";

const SearchUserComponent = () => {
  const userState = useSelector((state: RootState) => state.UserReducer);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [headerSpell, setHeaderSpell] = useState("");

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
      <div className="users__container">
        {userState.sortedUsers.map((user, index, userArray) => {
          const first__spell__username = user.login.substr(0, 1).toLowerCase();
          if (index === 0) {
            return (
              <div key={user.node_id}>
                <HeaderSpellingComponent
                  headerSpelling={first__spell__username}
                />
                <UserCellComponent user={user} />
              </div>
            );
          } else {
            const first_spell_previous_username = userArray[index - 1].login
              .substr(0, 1)
              .toLowerCase();
            if (first__spell__username !== first_spell_previous_username) {
              return (
                <div key={user.node_id}>
                  <HeaderSpellingComponent
                    headerSpelling={first__spell__username}
                  />
                  <UserCellComponent user={user} />
                </div>
              );
            } else {
              return (
                <div key={user.node_id}>
                  <UserCellComponent user={user} />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default SearchUserComponent;
