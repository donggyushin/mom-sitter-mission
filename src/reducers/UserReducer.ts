import {
  SEARCHING_USER_FAIL,
  SEARCHING_USER_SUCCESS,
  UserDispatchType,
  UserType,
} from "../actions/UserActionTypes";

import { compareUser } from "../utils/Utils";

interface InitialState {
  success: boolean;
  users: UserType[];
  sortedUsers: UserType[];
}

const intiailState: InitialState = {
  success: true,
  users: [],
  sortedUsers: [],
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
    default:
      return state;
  }
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
