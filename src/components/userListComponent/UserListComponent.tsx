import HeaderSpellingComponent from "../headerSpellingComponent/HeaderSpellingComponent";
import React from "react";
import UserCellComponent from "../userCellComponent/UserCellComponent";
import { UserType } from "../../actions/UserActionTypes";

interface Props {
  userList: UserType[];
}

const UserListComponent: React.FunctionComponent<Props> = ({ userList }) => {
  return (
    <div className="users__container">
      {userList.map((user, index, userArray) => {
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
  );
};

export default UserListComponent;
