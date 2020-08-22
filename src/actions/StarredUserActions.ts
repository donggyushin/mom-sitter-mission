import {
  ADD_STARRED_USER,
  FETCHING_STARRED_USER_SUCCESS,
  REMOVE_STARRED_USER,
  SEARCHING_STARRED_USER,
  STOP_SEARCHING_MODE,
  StarredUserDispatchType,
} from "./StarredUserActionTypes";

import { Dispatch } from "redux";
import { RootState } from "../Store";
import { STARRED_USERS } from "../constants/Constants";
import { UserType } from "./UserActionTypes";
import { compareUser } from "../utils/Utils";

// 즐겨찾기내에서 원하는 유저를 검색해주는 함수
export const searchingStarredUser = (username: string) => (
  dispatch: Dispatch<StarredUserDispatchType>,
  getState: () => RootState
) => {
  // 즐겨찾기에 등록된 유저들내에서 검색을 하는 코드입니다. 만약에 공백 문자열로 검색이 이루어지게 될 시
  // 검색모드가 취소되어서 모든 즐겨찾기에 등록된 유저들을 보여주게 됩니다.
  if (username === "") {
    return dispatch({
      type: STOP_SEARCHING_MODE,
    });
  }
  // const starredUsersString = localStorage.getItem(STARRED_USERS);
  // if (!starredUsersString) return;
  const starredUsers = getState().StarredUserReducer.users;

  // 검색어를 기반으로 즐겨찾기에 등록된 유저들을 검색합니다.
  // 대소문자에 구분없이 검색가능하게 하기 위해서 모두 lowerCase로 변환 후 비교하였습니다.
  const searchedStarredUsers = starredUsers.filter((user) =>
    user.login.toLowerCase().includes(username.toLowerCase())
  );

  dispatch({
    type: SEARCHING_STARRED_USER,
    payload: {
      users: searchedStarredUsers,
      searchText: username,
    },
  });
};

// 즐겨찾기에서 해당 유저를 제거하는 함수
export const removeStarredUser = (
  userToRemove: UserType,
  dispatchToCallSearchingStarredUser: Dispatch<any>
) => (
  dispatch: Dispatch<StarredUserDispatchType>,
  getState: () => RootState
) => {
  const previousSearchText = getState().StarredUserReducer.previousSearchText;

  const existingStarredUsers = getState().StarredUserReducer.users;

  const updatedStarredUsers = existingStarredUsers.filter(
    (user) => user.node_id !== userToRemove.node_id
  );
  const sortedUsers = updatedStarredUsers.sort(compareUser);

  // 이곳에서 searchingStarredUser 메서드를 다시 호출하는 이유는
  // 즐겨찾기에서 유저를 빼낼때, 즐겨찾기 탭에서 보여지는 데이터도 함께
  // 최신화 되길 원하기 때문입니다.

  dispatch({
    type: REMOVE_STARRED_USER,
    payload: sortedUsers,
  });
  dispatchToCallSearchingStarredUser(searchingStarredUser(previousSearchText));
  localStorage.setItem(STARRED_USERS, JSON.stringify(sortedUsers));
};

// 즐겨찾기에 새로운 유저를 추가하는 함수
export const addStarredUser = (
  user: UserType,
  dispatchToCallSearchingStarredUser: Dispatch<any>
) => (
  dispatch: Dispatch<StarredUserDispatchType>,
  getState: () => RootState
) => {
  const previousSearchText = getState().StarredUserReducer.previousSearchText;
  const existingStarredUsers = getState().StarredUserReducer.users;
  existingStarredUsers.push(user);
  const sortedUsers = existingStarredUsers.sort(compareUser);

  // 이곳에서 searchingStarredUser 메서드를 다시 호출하는 이유는
  // 즐겨찾기에서 유저를 추가할때, 즐겨찾기 탭에서 보여지는 데이터도 함께
  // 최신화 되길 원하기 때문입니다.

  dispatch({
    type: ADD_STARRED_USER,
    payload: sortedUsers,
  });
  dispatchToCallSearchingStarredUser(searchingStarredUser(previousSearchText));
  localStorage.setItem(STARRED_USERS, JSON.stringify(sortedUsers));
};

// 브라우저의 로컬호스트내에 추가된 즐겨찾기 유저들을 불러오는 함수입니다.
export const fetchingStarredUsers = () => (
  dispatch: Dispatch<StarredUserDispatchType>
) => {
  const starredUsersString = localStorage.getItem(STARRED_USERS);
  if (!starredUsersString) return;
  const starredUsers = JSON.parse(starredUsersString) as UserType[];
  const sortedUsers = starredUsers.sort(compareUser);
  return dispatch({
    type: FETCHING_STARRED_USER_SUCCESS,
    payload: sortedUsers,
  });
};
