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

export const searchingStarredUser = (username: string) => (
  dispatch: Dispatch<StarredUserDispatchType>
) => {
  if (username === "") {
    return dispatch({
      type: STOP_SEARCHING_MODE,
    });
  }
  console.log("이거 호출되는지 확인");
  const starredUsersString = localStorage.getItem(STARRED_USERS);

  if (!starredUsersString) return;
  const existingStarredUsers = JSON.parse(starredUsersString) as UserType[];

  const searchedStarredUsers = existingStarredUsers.filter((user) => {
    console.log("user: ", user);
    return user.login.includes(username);
  });
  console.log("searchedStarredUsers: ", searchedStarredUsers);
  return dispatch({
    type: SEARCHING_STARRED_USER,
    payload: {
      users: searchedStarredUsers,
      searchText: username,
    },
  });
};

export const removeStarredUser = (
  userToRemove: UserType,
  dispatchToCallSearchingStarredUser: Dispatch<any>
) => async (
  dispatch: Dispatch<StarredUserDispatchType>,
  getState: () => RootState
) => {
  const starredState = getState().StarredUserReducer;
  const previousSearchText = getState().StarredUserReducer.previousSearchText;

  const existingStarredUsers = starredState.users;

  const updatedStarredUsers = existingStarredUsers.filter(
    (user) => user.node_id !== userToRemove.node_id
  );
  const sortedUsers = updatedStarredUsers.sort(compareUser);
  await localStorage.setItem(STARRED_USERS, JSON.stringify(sortedUsers));
  dispatchToCallSearchingStarredUser(searchingStarredUser(previousSearchText));
  return dispatch({
    type: REMOVE_STARRED_USER,
    payload: sortedUsers,
  });
};

export const addStarredUser = (
  user: UserType,
  dispatchToCallSearchingStarredUser: Dispatch<any>
) => async (
  dispatch: Dispatch<StarredUserDispatchType>,
  getState: () => RootState
) => {
  const starredState = getState().StarredUserReducer;
  const previousSearchText = getState().StarredUserReducer.previousSearchText;
  const existingStarredUsers = starredState.users;
  existingStarredUsers.push(user);
  const sortedUsers = existingStarredUsers.sort(compareUser);
  await localStorage.setItem(STARRED_USERS, JSON.stringify(sortedUsers));
  dispatchToCallSearchingStarredUser(searchingStarredUser(previousSearchText));
  return dispatch({
    type: ADD_STARRED_USER,
    payload: sortedUsers,
  });
};

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
