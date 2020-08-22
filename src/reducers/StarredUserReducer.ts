/**
 * 즐겨찾기에 등록된 유저들의 상태를 관리하는 리듀서
 */

import {
  ADD_STARRED_USER,
  FETCHING_STARRED_USER_SUCCESS,
  REMOVE_STARRED_USER,
  SEARCHING_STARRED_USER,
  STOP_SEARCHING_MODE,
  StarredUserDispatchType,
} from "../actions/StarredUserActionTypes";

import { UserType } from "../actions/UserActionTypes";

interface InitialState {
  users: UserType[];
  searchMode: boolean;
  searchedUsers: UserType[];
  previousSearchText: string;
}

const intiailState: InitialState = {
  users: [],
  searchMode: false,
  searchedUsers: [],
  previousSearchText: "",
};

const StarredUserReducer = (
  state = intiailState,
  action: StarredUserDispatchType
): InitialState => {
  switch (action.type) {
    case REMOVE_STARRED_USER:
      return removeStarredUser(state, action);
    case ADD_STARRED_USER:
      return addStarredUser(state, action);
    case FETCHING_STARRED_USER_SUCCESS:
      return fetchingStarredUserSuccess(state, action);
    case SEARCHING_STARRED_USER:
      return searchingStarredUser(state, action);
    case STOP_SEARCHING_MODE:
      return stopSearchingMode(state, action);
    default:
      return state;
  }
};

const stopSearchingMode = (
  state: InitialState,
  action: StarredUserDispatchType
): InitialState => {
  if (action.type !== STOP_SEARCHING_MODE) return state;
  return {
    ...state,
    searchMode: false,
    previousSearchText: "",
  };
};

const searchingStarredUser = (
  state: InitialState,
  action: StarredUserDispatchType
): InitialState => {
  if (action.type !== SEARCHING_STARRED_USER) return state;
  const { searchText, users } = action.payload;
  return {
    ...state,
    searchMode: true,
    searchedUsers: users,
    previousSearchText: searchText,
  };
};

const removeStarredUser = (
  state: InitialState,
  action: StarredUserDispatchType
): InitialState => {
  if (action.type !== REMOVE_STARRED_USER) return state;
  const users = action.payload;
  return {
    ...state,
    users,
  };
};

const addStarredUser = (
  state: InitialState,
  action: StarredUserDispatchType
): InitialState => {
  if (action.type !== ADD_STARRED_USER) return state;
  const users = action.payload;

  return {
    ...state,
    users,
  };
};

const fetchingStarredUserSuccess = (
  state: InitialState,
  action: StarredUserDispatchType
): InitialState => {
  if (action.type !== FETCHING_STARRED_USER_SUCCESS) return state;
  const users = action.payload;
  return {
    ...state,
    users,
  };
};

export default StarredUserReducer;
