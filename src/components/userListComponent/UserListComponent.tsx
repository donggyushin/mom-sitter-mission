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
          // 첫번째 인자일 경우에는 무조건 헤더표시를 띄워줍니다.
          return (
            <div key={user.node_id}>
              <HeaderSpellingComponent
                headerSpelling={first__spell__username}
              />
              <UserCellComponent user={user} />
            </div>
          );
        } else {
          // 두번째 인자부터는 이전 인덱스의 유저명과 비교해서
          // 시작하는 이니셜이 달라지게 될때마다 헤더를 붙여줍니다.
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
