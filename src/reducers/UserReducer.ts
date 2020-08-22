/**
 * 깃허브에서 불러온 유저데이터를 관리하는 리듀서
 */

import {
  SEARCHING_USER_FAIL,
  SEARCHING_USER_SUCCESS,
  USER_LOADING_FALSE,
  USER_LOADING_TRUE,
  UserDispatchType,
  UserType,
} from "../actions/UserActionTypes";

import { compareUser } from "../utils/Utils";

interface InitialState {
  success: boolean;
  users: UserType[];
  sortedUsers: UserType[];
  loading: boolean;
}

const intiailState: InitialState = {
  success: true,
  users: [],
  sortedUsers: [],
  loading: false,
};

const UserReducer = (
  state = intiailState,
  action: UserDispatchType
): InitialState => {
  switch (action.type) {
    case SEARCHING_USER_FAIL:
      return searchUserFail(state, action);
    case SEARCHING_USER_SUCCESS:
      return searchUserSuccess(state, action);
    case USER_LOADING_TRUE:
      return loadingTrue(state, action);
    case USER_LOADING_FALSE:
      return loadingFalse(state, action);
    default:
      return state;
  }
};

const loadingTrue = (
  state: InitialState,
  action: UserDispatchType
): InitialState => {
  if (USER_LOADING_TRUE !== action.type) return state;
  return {
    ...state,
    loading: true,
  };
};

const loadingFalse = (
  state: InitialState,
  action: UserDispatchType
): InitialState => {
  if (USER_LOADING_FALSE !== action.type) return state;
  return {
    ...state,
    loading: false,
  };
};

const searchUserSuccess = (
  state: InitialState,
  action: UserDispatchType
): InitialState => {
  if (action.type === SEARCHING_USER_SUCCESS) {
    const users = action.payload;

    const sortedUsers = users.sort(compareUser);

    return {
      ...state,
      users,
      sortedUsers,
    };
  } else {
    return searchUserFail(state, action);
  }
};

const searchUserFail = (
  state: InitialState,
  _: UserDispatchType
): InitialState => {
  return {
    ...state,
    success: false,
  };
};

export default UserReducer;
